import { navigateTo } from '../support/page_objects/navigationPage';
import { onFormLayoutsPage } from '../support/page_objects/formLayoutsPage';
import { onDatePickerPage } from '../support/page_objects/datePickerPage';
import { onSmartTables } from '../support/page_objects/smartTablesPage';

describe('Test with page objects', () => {
    beforeEach('Open Application', () => {
        cy.openHomePage();
    });

    it('verify navigation across the page', () => {
        navigateTo.formLayoutsPage();
        navigateTo.formDatePickerPage();
        navigateTo.formSmartTablePage();
        navigateTo.formToastrPage();
        navigateTo.formTooltipPage();
    });

    it.only('Should submit inline and date in the calander', () => {
        navigateTo.formLayoutsPage();
        onFormLayoutsPage.submitInlineFormWithNameAndEmail(
            'Ram',
            'ramsar7002@gmail.com'
        );
        onFormLayoutsPage.submitBasicFormWithNameAndEmail(
            'yuvalraviv27@gmail.com',
            '757'
        );

        navigateTo.formDatePickerPage();
        onDatePickerPage.selectCommonDatePickerFromToday(200);
        onDatePickerPage.selectDatePickerWithRange(5, 200);
        onDatePickerPage.selectDatepickerWithDisabledMinMaxValues(5);

        navigateTo.formSmartTablePage();
        onSmartTables.updatePageByFirstName('Jacob', '21');
        onSmartTables.createRowByFirstAndLastName('Yuval', 'Raviv');
        onSmartTables.deleteUserByIndex(3);
    });
});
