import os
from re import I
from flask import Flask, flash, redirect, render_template, request, session
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

print(os.environ.get('API_KEY'))
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
    cash_remaining = round(db.execute(
        "SELECT cash FROM users WHERE id = (?)", (user_id,)).fetchall()[0]["cash"], 2)

    # get stock transactions for this particular user from the DB
    data = db.execute(
        "SELECT * FROM stocks WHERE user_id = (?)", (user_id,)).fetchall()

    new_data = {}
    grand_total = 0

    for i in data:
        current_price = round(lookup(i["stock_symbol"])["price"], 2)
        if i["stock_symbol"] in new_data:
            new_data[i["stock_symbol"]]["stocks_bought"] += i["stocks_bought"]
            new_data[i["stock_symbol"]]["total"] += i["stocks_bought"] * current_price
        else:
            new_data[i["stock_symbol"]] = {"stocks_bought" : i["stocks_bought"], "name": i["name"], "total":current_price*i["stocks_bought"], "current_price" : current_price}

    for i in new_data.values():
        i["total"] = round(i["total"], 2)
        grand_total += i["total"]
    grand_total = round(grand_total + cash_remaining, 2)
    return render_template("index.html", cash_remaining=cash_remaining, new_data=new_data, grand_total=grand_total)


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""
    if request.method == "POST":

        # get data from user
        symbol = request.form.get("symbol")
        shares = int(request.form.get("shares"))
        look_up = lookup(symbol)
        if not shares or shares < 0:
            return apology("Invalid amount of shares!!")
        elif not look_up:
            return apology("Invalid Symbol!!")

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
            # register the stocks bought in the DB
            db.execute("INSERT INTO stocks(user_id, stock_symbol, stocks_bought, bought_at, name) VALUES (?, ?, ?, ?, ?)",
                        (user_id, symbol, shares, look_up["price"], look_up["name"]))

            # update the cash remaining after the transaction is done
            updated_balance = cash_remaining[0]["cash"] - \
                (shares * look_up["price"])
            db.execute("UPDATE users SET cash = (?) WHERE id = (?)",
                        (updated_balance, user_id))
            db.commit()
            return redirect("/")

    else:
        return render_template("buy.html")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    return apology("TODO")


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
        confirm_password = request.form.get("confirm_password")

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
            print("in username already taken")
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
    return apology("TODO")

def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)


# Listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)
