import {
    UserLoginRequestDto,
    UserRegistrationRequestDto,
} from "../dtos/Users.dto";
import { agent } from "./Agent";

const registerUser = (dto: UserRegistrationRequestDto) =>
    agent.postRequest("users/register", dto);

const loginUser = (dto: UserLoginRequestDto) =>
    agent.agent
        .post(`users/login`, dto)
        .then((res) => ({ token: res.headers["Authorization"] || res.data.token }));

const UserRequests = {
    registerUser,
    loginUser,
};

export default UserRequests;
