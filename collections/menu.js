Schemas = {};
ActualPredictions = new Meteor.Collection('actualpredictions', {});
MyPredictions = new Meteor.Collection('mypredictions', {});
Schemas.ActualPredictions = new SimpleSchema({
    team1: {
        type: String,
        label: "Team 1",
    },
    team2: {
        type: String,
        label: "Team 2",
    },
    goal1: {
        type: String,
        label: "Goals for Team 1",
    },
    goal2: {
        type: String,
        label: "Goals for Team 2",
    }
});
ActualPredictions.attachSchema(Schemas.ActualPredictions);

Schemas.MyPredictions = new SimpleSchema({
    userId: {
        type: String,
        label: "User ID",
    },
	userEmail: {
        type: String,
        label: "User Email",
    },
    team1: {
        type: String,
        label: "Team 1",
    },
    team2: {
        type: String,
        label: "Team 2",
    },
    goal1: {
        type: String,
        label: "Goals for Team 1",
    },
    goal2: {
        type: String,
        label: "Goals for Team 2",
    },
    round: {
        type: String,
        label: "Round",
        optional: true
    }
});
MyPredictions.attachSchema(Schemas.MyPredictions);

MyPredictions.allow({
    insert: function(userId, doc) {
        console.log("insert userId", userId, doc)
        return true;
    },
    update: function(userId, doc, fields, modifier) {
        console.log("update userId", userId, doc)
        return true;
    },
    remove: function(userId, doc) {
        console.log("remove userId", userId)
        return true;
    }
});