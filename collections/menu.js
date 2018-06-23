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
    }
});
MyPredictions.attachSchema(Schemas.MyPredictions);

MyPredictions.deny({
    insert: function(userId, doc) {
        return true;
    },
    update: function(userId, doc, fields, modifier) {
        return true;
    },
    remove: function(userId, doc) {
        return true;
    }
});