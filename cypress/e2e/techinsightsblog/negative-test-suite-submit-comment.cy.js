import homePage from "./pages/HomePage";
import commentFormPage from "./pages/CommentFormPage";

describe('Negetive TestSuits: Validate comment feature on a blog', () => {

  let testConfigData;
  let testFormData;

  before('before: load test data from fixtures', () => {
    cy.log('Negetive TestCases: Started Validate Comment feature on a blog');
  })

  beforeEach('before: load test data from fixtures', () => {
    cy.fixture('config.json').then((jsonData) => {
      testConfigData = jsonData;
    })
    cy.fixture('form-data.json').then((jsonData) => {
      testFormData = jsonData;
    })

    // Navigate to blog page
    homePage.visit();

    // Goto comment section
    homePage.goToComment();
  })

  it('should not submit with empty comment', () => {
    commentFormPage.submitComment({
      comment: null,
      name: testFormData.name,
      email: `johndoe${new Date().getTime()}@example.com`,
      website: null
    });

    // Verify error submission message
    commentFormPage.verifyCommentPostError();
  });
  it('should not submit with empty name', () => {
    commentFormPage.submitComment({
      comment: testFormData.comment,
      name: null,
      email: `johndoe${new Date().getTime()}@example.com`,
      website: null
    });

    // Verify error submission message
    commentFormPage.verifyCommentPostError();
  });
  it('should not submit with empty email', () => {
    commentFormPage.submitComment({
      comment: testFormData.comment,
      name: testFormData.name,
      email: null,
      website: null
    });

    // Verify error submission message
    commentFormPage.verifyCommentPostError();
  });

  it('should not submit with invalid email format', () => {
    commentFormPage.submitComment({
      comment: testFormData.comment,
      name: testFormData.name,
      email: testFormData.emailInvalid,
      website: null
    });

    // Verify error submission message
    commentFormPage.verifyCommentPostError();
  });

  afterEach('after: wait for certain time before next test case', () => {
    // wait for time for preventing comment spam
    cy.wait(testConfigData.testCaseDelayTime)
  })
})