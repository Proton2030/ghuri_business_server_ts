"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE = void 0;
exports.MESSAGE = {
    post: {
        succ: "Data added successfully",
        fail: "Failed to add data",
        sameEntry: "Same entry not allowed",
        custom: (msg) => msg
    },
    get: {
        succ: "Data fetched successfully",
        fail: "Failed to fetch data",
        empty: "Database empty",
        enough: "Not Enough Data to Fetch",
        custom: (msg) => msg
    },
    put: {
        succ: "Data edited successfully",
        fail: "Failed to edit data",
        custom: (msg) => msg
    },
    patch: {
        succ: "Data edited successfully",
        fail: "Failed to edit data",
        custom: (msg) => msg
    },
    delete: {
        succ: "Data deleted successfully",
        fail: "Failed to delete data",
        custom: (msg) => msg
    },
    error: "Error",
    none: "No such data",
    custom: (msg) => msg
};
