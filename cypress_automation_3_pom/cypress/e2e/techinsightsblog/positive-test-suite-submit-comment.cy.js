import homePage from "./pages/HomePage";
import commentFormPage from "./pages/CommentFormPage";

describe('Positive TestCases: Validate comment feature on a blog', () => {

  let testConfigData;
  let testFormData;

  before('before: load test data from fixtures', () => {
    cy.log('Positive TestCases: Started Validate Comment feature on a blog');
  })

  beforeEach('beforeEach: navigate to blog page', () => {
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

  it('should submit comment successfully without optional field(website)', () => {
    commentFormPage.submitComment({
      comment: testFormData.comment,
      name: testFormData.name,
      email: `johndoe${new Date().getTime()}@example.com`,
      website: null
    });

    // Verify successful submission message
    commentFormPage.verifyCommentPostSuccess();
  });

  it('should submit comment successfully with optional field(website)', () => {
    commentFormPage.submitComment({
      comment: testFormData.comment,
      name: testFormData.name,
      email: `johndoe${new Date().getTime()}@example.com`,
      website: testFormData.website
    });

    commentFormPage.verifyCommentPostSuccess(); 
  });

  it('should submit long comment', () => {
    commentFormPage.submitComment({
      comment: testFormData.commentLong,
      name: testFormData.name,
      email: `johndoe${new Date().getTime()}@example.com`,
      website: testFormData.website
    });

    commentFormPage.verifyCommentPostSuccess(); 
  });

  it('should submit comment with different email formats', () => {
    const emails = [
      `johndoe${new Date().getTime()}@example.com`, 
      `jane.doe${new Date().getTime()}@company.com`, 
      `test+123${new Date().getTime()}@domain.org`
    ];
    emails.forEach(email => {
      commentFormPage.submitComment({
        comment: testFormData.commentLong,
        name: testFormData.name,
        email: email,
        website: testFormData.website
      });
  
      commentFormPage.verifyCommentPostSuccess(); 

      // wait for spam limit
      cy.wait(testConfigData.testCaseDelayTime)
    });    
  });

  afterEach('after: wait for certain time before next test case', () => {
    // wait for time for preventing comment spam
    cy.wait(testConfigData.testCaseDelayTime)
  })
})