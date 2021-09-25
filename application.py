import os
from re import I
from flask import Flask, flash, redirect, render_template, request, session, jsonify
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash
from helpers import apology, login_required, lookup, usd
import sqlite3

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
def make_dicts(cursor, row):
    return dict((cursor.description[idx][0], value)
                for idx, value in enumerate(row))

db = sqlite3.connect("finance.db", check_same_thread=False)
db.row_factory = make_dicts

# Make sure API key is set
if not os.environ.get('API_KEY'):
    raise RuntimeError("API_KEY not set")


@app.route("/")
@login_required
def index():

    """Show portfolio of stocks"""
    user_id = session["user_id"]

    # get cash remaining from the DB
    cash_remaining = int(db.execute(
        "SELECT cash FROM users WHERE id = (?)", (user_id,)).fetchall()[0]["cash"])

    # get stock transactions for this particular user from the DB
    data = db.execute(
        "SELECT * FROM stocks WHERE user_id = (?)", (user_id,)).fetchall()

    new_data = {}
    grand_total = 0

    for i in data:
        current_price = lookup(i["stock_symbol"])["price"]
        
        new_data[i["stock_symbol"]] = {"stocks_bought": i["stocks_bought"], "name" : i["name"], "total" : current_price * i["stocks_bought"], "current_price" : usd(current_price)}

    for i in new_data:
        grand_total += int(new_data[i]["total"])
        new_data[i]["total"] = usd(new_data[i]["total"])

    grand_total = grand_total + cash_remaining

    return render_template("index.html", cash_remaining=usd(cash_remaining), new_data=new_data, grand_total=usd(grand_total))

# TODO
# redefine index accordingly (optimize)
# get rid of redundant column in the db

@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""
    if request.method == "POST":

        # get data from user
        symbol = request.form.get("symbol")
        shares = request.form.get("shares")
        look_up = lookup(symbol)
        if not shares or not shares.isnumeric() or int(shares) < 0:
            return apology("Invalid amount of shares!!")
        elif not look_up:
            return apology("Invalid Symbol!!")

        shares = int(shares)

        # get user info
        user_id = session["user_id"]
        user_name = db.execute(
            "SELECT username FROM users WHERE id = (?)", (user_id,)).fetchall()

        # get cash in the account
        cash_remaining = db.execute(
            "SELECT cash FROM users WHERE username = (?)", (user_name[0]["username"],)).fetchall()

        # check if the user can afford the shares
        if cash_remaining[0]["cash"] < (shares * look_up["price"]):
            return apology("Insufficient Funds!!")

        else:
            # check if stock already exists in the stocks table
            exists = db.execute("SELECT * FROM stocks WHERE user_id = (?) AND stock_symbol = (?)",
                                [user_id, symbol]).fetchall()

            # if the stock already exists in the users portfolio then add to it
            if len(exists) > 0:
                total_shares = exists[0]["stocks_bought"] + shares
                db.execute("UPDATE stocks SET stocks_bought= (?) WHERE user_id=(?) and stock_symbol = (?)",
                           [total_shares, user_id, symbol])

            else:
                # register the stocks bought in the stocks table
                db.execute(
                    "INSERT INTO stocks(user_id, stock_symbol, stocks_bought, bought_at, name) VALUES (?, ?, ?, ?, ?)",
                    (user_id, symbol, shares, look_up["price"], look_up["name"]))

            # insert in the transactions table
            db.execute(
                "INSERT INTO TRANSACTIONS(user_id, stock_symbol, stocks_bought, bought_at, name) VALUES (?, ?, ?, ?, ?)",
                [user_id, symbol, shares, look_up["price"], look_up["name"]])

            # update the cash remaining after the transaction is done
            updated_balance = cash_remaining[0]["cash"] - \
                              (shares * look_up["price"])
                              
            db.execute("UPDATE users SET cash = (?) WHERE id = (?)", [updated_balance, user_id])
            db.commit()
            return redirect("/")

    else:
        return render_template("buy.html")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    user_id = session["user_id"]
    transactions_data = db.execute("SELECT * FROM transactions WHERE user_id = (?)", [user_id]).fetchall()

    # TODO:
    # ordered dictionary
    # return jsonify(transactions_data)

    return render_template("history.html", transactions=transactions_data)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = (?)",
                          (request.form.get("username"),)).fetchall()

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""
    if request.method == "POST":

        # lookup the stock price and display it to the user
        symbol = request.form.get("symbol")
        look_up = lookup(symbol)

        if not look_up:
            return apology("Invalid Symbol")
        look_up["price"] = usd(look_up["price"])
        return render_template("quoted.html", symbol=symbol, look_up=look_up)

    else:
        return render_template("quote.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "POST":
        # Get username and password from the request
        username = request.form.get("username")
        password = request.form.get("password")
        confirm_password = request.form.get("confirmation")

        # check if the username exists in the database
        check_username = db.execute(
            "SELECT username FROM users WHERE username = (?)", (username,)).fetchall()

        # check if the user has entered all the values
        if (not username) or (not password) or (not confirm_password):
            return apology("Sorry!! You've got to fill the entire form!!")

        # check if both the passwords entered are identical
        elif password != confirm_password:
            return apology("Your passwords don't match!!")

        # if the username is already taken
        elif len(check_username) > 0:
            return apology("Username already taken!!")
        else:
            # insert the user details in the database
            hashed_password = generate_password_hash(password)
            db.execute("INSERT INTO users (username, hash) VALUES (?, ?)",
                       (username, hashed_password,))
            db.commit()
        return redirect("/login")
    else:
        return render_template("register.html")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""
    if request.method == "POST":

        # get details from the request
        symbol = request.form.get('symbol')
        shares = int(request.form.get("shares"))
        user_id = session["user_id"]

        # get the shares data from the DB
        share_details = db.execute("SELECT * FROM stocks WHERE user_id = (?) and stock_symbol=(?)",
                                   [user_id, symbol]).fetchall()

        # if not shares in the stocks table
        if not share_details:
            return apology("You don't own shares of this company!!")

        # if the no of shares to sell if more than the no of shares owned
        no_of_shares_previously_owned = share_details[0]["stocks_bought"]
        if no_of_shares_previously_owned < shares:
            return apology("Invalid no of shares!!")

        # if no of shares to sell is equal to no of shares owned
        if no_of_shares_previously_owned == shares:
            db.execute("DELETE FROM stocks WHERE user_id=(?) and stock_symbol=(?)", [user_id, symbol])

        else:
            db.execute("UPDATE stocks SET stocks_bought=(?) WHERE user_id=(?) and stock_symbol=(?)",
                       [no_of_shares_previously_owned - shares, user_id, symbol])

        # update the transaction in the transactions table
        stocks_sold = "-" + str(shares)
        look_up = lookup(symbol)
        db.execute("INSERT INTO transactions (user_id, stock_symbol, stocks_bought, bought_at, name) VALUES (?, ?, ?, ?, ?)", [user_id, symbol, stocks_sold, look_up["price"], look_up["name"]])

        # update the new cash amount
        previous_cash = db.execute("SELECT cash FROM users WHERE id=(?)", [user_id]).fetchall()
        total_cash = previous_cash[0]["cash"] + (shares * look_up["price"])

        db.execute("UPDATE users SET cash=(?) WHERE id=(?)", [total_cash, user_id])
        db.commit()

        return redirect("/")

    else:
        user_id = session["user_id"]

        # get the list of all the stocks owned from DB
        stocks_owned_list = db.execute("SELECT stock_symbol FROM stocks WHERE user_ID=(?)",
                                       [user_id]).fetchall()

        return render_template("sell.html", stocks_owned_list=stocks_owned_list)

def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)


# Listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)
