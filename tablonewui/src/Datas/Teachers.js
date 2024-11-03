const Teachers =[
    {
        id:0,
        rank:0,
        firstName:"Mete",
        lastName:"Özbaltan",
        busyHours: [0,1],
        fullName: function (){
            return this.firstName + " " +this.lastName;
        }
    },
    {
        id:1,
        rank:0,
        firstName:"Mehmet",
        lastName:"Bayğın",
        busyHours: [0,1],
        fullName: function (){
            return this.firstName + " " +this.lastName;
        }
    }
]

export default Teachers