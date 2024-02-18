import configData from '../../../fixtures/config.json';

class CommentFormPage {
    elements = {
        commentLink: () => cy.get('.comments-link > a'),
        commentList: () => cy.get('.comment-list'),
        commentError: () => cy.get('.wp-die-message'),
        formTitle: () => cy.get('#reply-title', { timeout: Number(configData.defaultTimeout) }),
        formFieldComment: () => cy.get('#comment'),
        formFieldAuthor: () => cy.get('#author'),
        formFieldEmail: () => cy.get('#email'),
        formFieldUrl: () => cy.get('#url'),
        formFieldSubmitButton: () => cy.get('#submit'),
    }

    submitComment(data) {
        // Wait for Comment section to be visible
        this.elements.formTitle().should("be.visible");

        // Enter comment details
        if(data.comment) this.elements.formFieldComment().type(data.comment);

        // Enter name
        if(data.name) this.elements.formFieldAuthor().type(data.name);

        // Enter email
        if(data.email) this.elements.formFieldEmail().type(data.email);

        // Enter website
        if(data.website) this.elements.formFieldUrl().type(data.website);

        // Submit the form
        this.elements.formFieldSubmitButton().click();
    }

    verifyCommentPostSuccess(){
        this.elements.commentList().should('be.visible')
            .and('contain', 'Your comment is awaiting moderation');
    }

    verifyCommentPostError(){
        this.elements.commentError().should('be.visible')
            .and('contain', 'Error:');
    }
}

export default new CommentFormPage();