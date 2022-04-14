import { UserService } from "../services/userService"


const user = {
                loginName: "chris",
                password: "password"
            }

export const seedUser = async () => {
    const userService = new UserService()
    // check if user table is empty
    let existingUsers = await userService.getAllUsers()
    if (existingUsers.length == 0)
    {
        userService.createUser(user);
        console.log("User data seeded!")
    }
}