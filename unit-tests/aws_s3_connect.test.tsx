import {UserS3} from "../src/aws_s3_connect";
// import {App} from "../src/app";

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
  test("Invalid inputs (bad user keys)", () => {
    let tempS3 = new UserS3("badKey", "badKey");
    function tempFunction1(input : string) {}
    function tempFunction2(input : UserS3) {}
    expect(tempS3.checkAndDisplayValidUser(
      tempFunction1, "bucket", tempFunction2, tempS3)).resolves.toThrow();
  });


});