import {UserS3} from "../src/aws_s3_connect";
// import {App} from "../src/app";
const { mockClient } = require("aws-sdk-client-mock");
const { S3Client } = require("@aws-sdk/client-s3");
const { STSClient } = require("@aws-sdk/client-sts");

// test function changeBucket
describe("Test changeBucket()", () => {
  test("Valid bucket name (non empty string)", () => {
    let s = new UserS3("test", "test");
    expect(s.changeBucket("bucket")).toBeTruthy();
  });

  test("Invalid bucket name (empty string)", () => {

    let s = new UserS3("test", "test");
    expect(s.changeBucket("")).toBeFalsy();
  });
});


// test function changeUser
describe("Test changeUser()", () => {
  test("Valid inputs (non empty key strings)", () => {
    let s = new UserS3("publicKey", "privateKey");
    expect(s.changeUser("changePublicKey", "changePrivateKey")).toBeTruthy();

  });

  test("Invalid inputs (empty key strings)", () => {
    let s = new UserS3("publicKey", "privateKey");
    expect(s.changeUser("", "")).toBeFalsy();
  });
});


// test function checkAndDisplayValidBucket
// Temporary references
// https://stackoverflow.com/questions/49603338/how-to-test-an-exception-was-not-thrown-with-jest
// https://stackoverflow.com/questions/46042613/how-to-test-the-type-of-a-thrown-exception-in-jest
describe("Test checkAndDisplayValidBucket()", () => {
  const mockS3 = mockClient(S3Client);
  const mockSTS = mockClient(STSClient);
  // let testUserS3 = new UserS3("test", "test");

  beforeEach(() => {
    mockS3.reset();
    mockSTS.reset();
    // testUserS3.mockSetter(mockS3, mockSTS);
  });

  test("Invalid inputs (bad user keys)", () => {

    const mockS3 = mockClient(S3Client);
    const mockSTS = mockClient(STSClient);
    let testUserS3 = new UserS3("test", "test");
    testUserS3.mockSetter(mockS3, mockSTS);

    const tempFunction1 = () => {};
    const tempFunction2 = () => {};

    expect(testUserS3.checkAndDisplayValidUser(
      tempFunction1,
      "test",
      tempFunction2,
      mockS3,
    )).resolves.toBeFalsy();
  });
});