import { Host } from "../utils/constant";
import axios from "axios";

const apiClient = axios.create({
    baseURL:Host
})