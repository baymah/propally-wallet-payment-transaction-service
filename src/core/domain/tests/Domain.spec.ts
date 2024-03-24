// import { UserId } from "../../../modules/users/domain/userId"
// import { UniqueEntityID } from "../UniqueEntityId"

// let userId: UserId
// let id: UniqueEntityID

// describe("Core Domain", () => {
//   beforeEach(() => {
//     id = new UniqueEntityID()
//     userId = UserId.create(id).getValue()
//   })

//   it("should return truthy value on unique identity comparism", () => {
//     const res = userId.id.equals(id)
//     expect(res).toBeTruthy()
//   })

//   it("should return a truthy value after validating unique id",()=>{
//     const res = UniqueEntityID.isValidId("e89abbb8-4607-4812-a697-97ee359a5287");
//     console.log(res);
    
//     expect(res).toBeTruthy()
//   })
// })
