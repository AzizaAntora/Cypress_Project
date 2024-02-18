import configData from '../../../fixtures/config.json'

class HomePage {
    elements = {
        commentLink: () => cy.get('.comments-link > a')
    }

    visit() {
        cy.visit(configData.url);
    }

    goToComment() {
        this.elements.commentLink().should("be.visible");
        this.elements.commentLink().click();
    }
}

export default new HomePage();