import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import * as executions from '../fragments/executions';
import * as commun from '../fragments/commun.js';

const normalizeText = (s) => s.replace(/\s/g, '');
  

Given('executions and errors', () => {
  cy.server();

  cy.fixture('teams.json').as('teams');
  cy.route('GET', '/api/projects/the-demo-project/teams', '@teams');

  cy.fixture('executions_latest.json').as('executionsLatest');
  cy.route('GET', '/api/projects/the-demo-project/executions/latest', '@executionsLatest');

  cy.fixture('executions_history_4.json').as('executionsHistory4');
  cy.route('GET', '/api/projects/the-demo-project/executions/4/history', '@executionsHistory4');

  cy.fixture('executions_history_5.json').as('executionsHistory5');
  cy.route('GET', '/api/projects/the-demo-project/executions/5/history', '@executionsHistory5');

  cy.visit(executions.url);
});

When('on the executions and errors page, the user clicks on the actions and job reports button {string}', (executionId) => {
  executions.getActionsAndJobReportsButton(executionId).click();
});
When('on the executions and errors page, in the cart {string}, the user clicks on the run {string}', (executionId, runId) => {
  executions.getRun(runId, executionId).click();
});

When('on the executions and errors page, in the cart {string}, the user clicks on the {string} execution button', (executionId, navigation) => {
  
  executions.getNavigationButton(executionId, navigation).click();
});

Then('on the executions and errors page, in the actions and job reports list, the {string} button {string} is visible', (label, executionId) => {
  executions.getButton(label, executionId).should('be.visible');
});

Then('on the executions and errors page, in the actions and job reports list, the {string} button {string} is disabled', (label, executionId) => {
  executions.getButton(label, executionId).should('have.class', 'ivu-dropdown-item-disabled');
});

Then('on the executions and errors page, in the actions and job reports list, the {string} button {string} is enabled', (label, executionId) => {
  executions.getButton(label, executionId).should('have.class', 'ivu-dropdown-item');
});

Then('on the executions and errors page, in the cart {string}, on the run {string}, the team {string} is visible', (executionId, runId, teamId) => {
  executions.getCartRowSubTitle(runId, teamId, executionId).should('be.visible');
});

Then('on the executions and errors page, in the cart {string}, on the run {string}, the team {string} is hidden', (executionId, runId, teamId) => {
  executions.getCartRowSubTitle(runId, teamId, executionId).should('be.not.visible');
});

Then('on the executions and errors page, in the cart {string}, on the header, in the column {string}, the quality is {int}, the number of OK is {int}, the number of KO is {int}, the color is {string}', (executionId, qualityId, qualityValue, okValue, koValue, color) => {
  executions.getCartHeader(qualityId, executionId).find('.percentStyle').then(($percent) => {
    expect(normalizeText($percent.text())).to.equal(normalizeText(qualityValue + ' %'))
  });
  executions.getCartHeader(qualityId, executionId).find('.okStyle').then(($ok) => {
    expect(normalizeText($ok.text())).to.equal(normalizeText(okValue + " OK"))
  });
  executions.getCartHeader(qualityId, executionId).find('.koStyle').then(($ko) => {
    expect(normalizeText($ko.text())).to.equal(normalizeText(koValue + " KO"))
  });
  executions.getCartHeader(qualityId, executionId).then(($background) => {
    expect($background).to.have.css('background-color', commun.getRGB(color));
  });
}); 

Then('on the executions and errors page, in the cart {string}, on the header, in the column {string}, the threshold is {int}, the color is {string}', (executionId, qualityId, thresholdValue, color) => {
  executions.getCartHeader(qualityId, executionId).find('.thresholdStyle').then(($threshold) => {
    expect(normalizeText($threshold.text())).to.equal(normalizeText(thresholdValue + " %"))
  });
  executions.getCartHeader(qualityId, executionId).find('.thresholdStyle').then(($background) => {
    expect($background).to.have.css('background-color', commun.getRGB(color));
  });
});

Then('on the executions and errors page, in the cart {string}, on the run {string}, in the column {string}, for the team {string}, the progress bar is {float}% of success and {float}% of unhandled', (executionId, runId, qualityId, teamId, greenValue, orangeValue) => {
  var numPower = Math.pow(10, 6); 
  //TODO : find a way to get the value from the front
  var value = 1542812.5;
  var value75 = 1542708.33334;
  var valueOther = 1542678.57143;

  // GREEN 
  if (greenValue === 75) {
    value = value75;
  } else if(greenValue !== 100 && greenValue !== 50) {
    value = valueOther;
  }
  executions.getProgressBar(qualityId, runId, teamId, executionId, 'Passed').should('have.css' , 'width', ~~(greenValue * value/(100*10000) * numPower)/numPower + 'px');
  
  // ORANGE
  if(orangeValue !== 100 && orangeValue !== 50) {
    value = valueOther;
  }
  executions.getProgressBar(qualityId, runId, teamId, executionId, 'Handled').should('have.css' , 'width', ~~(orangeValue * value/(100*10000) * numPower)/numPower + 'px'); 
 
});

Then('on the executions and errors page, in the cart {string}, on the run {string}, in the column {string}, the number of ok is {int}, the number of problem is {int}, the number of ko is {int}', (executionId, runId, qualityId, okValue, pbValue, koValue) => {
  if (okValue + koValue + pbValue === 0){
    // no cart
    executions.getCartRowHeader(qualityId, runId, executionId).should('not.exist');
  } else {
    
    // init value for koValue and pbValue
    var koAndPbValue = '';
    if (koValue !== 0 || pbValue !== 0){
      if (pbValue !== 0){
        koAndPbValue = pbValue.toString();
      }
      if (koValue !== 0) {
        if (koAndPbValue !== ''){
          koAndPbValue += '+';
        }
        koAndPbValue += koValue.toString();
      }
    }

    
    executions.getCartRowHeader(qualityId, runId, executionId).find('.textPassed').then(($textPassed) => {
      if (okValue !== 0){
        expect(parseInt(normalizeText($textPassed.text()))).to.equal(okValue);
      } else {
        expect(normalizeText($textPassed.text())).to.equal('');
      }
    });
    
    const cartRowHeaderFailed = executions.getCartRowHeader(qualityId, runId, executionId).find('.textFailed');
    cartRowHeaderFailed.then(($textFailed) => {
      expect(normalizeText($textFailed.text())).to.equal(koAndPbValue);
    });
    
    if (pbValue !== 0){
      cartRowHeaderFailed.find('.textProblem').then(($textProblem) => {
        expect(parseInt(normalizeText($textProblem.text()))).to.equal(pbValue);
      });
    } else {
      cartRowHeaderFailed.find('.textProblem').should('have.length', 0)
    } 
  }
});

Then('on the executions and errors page, in the cart {string}, the version is {string} and the build date is {string}', (executionId, version, buildDate) => {
  executions.getVersion(executionId).then(($version) => {
    expect($version.text()).to.equal(version + ' ' + buildDate);
  });
});

Then('on the executions and errors page, in the cart {string}, the test date is {string}', (executionId, testDate) => {
  executions.getTestDate(executionId).then(($testDate) => {
    expect($testDate.text()).to.equal(testDate);
  });

 
});


Then('on the executions and errors page, in the cart {string}, the {string} execution button is clickable', (executionId, navigation) => {
  executions.getNavigationButton(executionId, navigation).should('be.not.disabled');
});

Then('on the executions and errors page, in the cart {string}, the {string} execution button is not clickable', (executionId, navigation) => {
  executions.getNavigationButton(executionId, navigation).should('be.disabled');
});

