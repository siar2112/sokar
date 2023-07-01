
class User{
    constructor(firstName, lastName, email, birthday, username,gender, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email= email;
        this.birthday= birthday;
        this.username= username;
        this.gender= gender;
        this.age= age;
    }
}

class PlayerUser extends User {
    constructor(firstName, lastName, email, birthday, username, gender, age, goals,
                cleanSheet, win, lose, draw, totalGame, yellowCards, redCards,
                defRating, offensiveRating, value) {
        super(firstName, lastName, email, birthday, username, gender, age);
        this.goals = goals;
        this.cleanSheet = cleanSheet;
        this.win = win;
        this.lose = lose;
        this.draw = draw;
        this.totalGame = totalGame;
        this.yellowCards = yellowCards;
        this.redCards = redCards;
        this.defRating = defRating;
        this.offensiveRating = offensiveRating;
        this.value = value;
    }
}

class AdminUser extends User{

}