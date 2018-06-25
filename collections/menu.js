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

var resultEntered = function(doc){
    var resultEntered = ActualPredictions.findOne({team1: doc.team1, team2: doc.team2});
    if(resultEntered)
        return true;

} 

var updateLocked = function(docId){
    var currPrediction = MyPredictions.findOne({_id: docId});
    return resultEntered(currPrediction);
}

var checkAccess = function(action, userId, doc){
    if(userId && userId === doc.userId){
        switch(action){
            case "Insert": return resultEntered(doc); break;
            case "Update": return updateLocked(doc._id); break;
            default: break; 
        }
    } else{
        return true;
    }
}

MyPredictions.deny({
    insert: function(userId, doc) {
        return checkAccess("Insert", userId, doc);
    },
    update: function(userId, doc, fields, modifier) {
        return checkAccess("Update", userId, doc);
    },
    remove: function(userId, doc) {
        return;
    }
});