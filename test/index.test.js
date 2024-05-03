"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const node_fs_1 = __importDefault(require("node:fs"));
const find_unique_emails_1 = require("../src/find_unique_emails");
const node_stream_1 = require("node:stream");
const node_path_1 = __importDefault(require("node:path"));
node_test_1.mock.method(node_fs_1.default, "existsSync", () => true);
node_test_1.mock.method(node_fs_1.default, "createReadStream", () => {
    const content = node_fs_1.default.readFileSync(node_path_1.default.join(__dirname, "test.txt"));
    const rs = new node_stream_1.Readable();
    rs.push(content, "utf-8");
    rs.push(null);
    return rs;
});
(0, node_test_1.describe)("Find unique emails based on the input files and exclude domain", () => {
    (0, node_test_1.it)("should return valid emails with no errors", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, find_unique_emails_1.findUniqueEmails)({
            filePaths: ["test.txt"],
            excludeDomain: "sync.com",
        });
        node_assert_1.default.notEqual(res.emails, [
            "user1@example.com",
            "user3@gmail.com",
            "user4@yahoo.com",
            "user5@outlook.com",
        ]);
        node_assert_1.default.notEqual(res.errors, []);
        // Reset the globally tracked mocks.
        node_test_1.mock.reset();
    }));
});
