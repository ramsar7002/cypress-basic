///<reference types="cypress"/>

describe('Our first Suite', () => {
    it('first test', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();
        //by tag name
        cy.get('input');

        //by id
        cy.get('#inputEmail1');

        //by class name
        cy.get('.input-full-width');

        //by attribute name
        cy.get('[placeholder]');

        //by attribute name and value
        cy.get('[placeholder = "Email"]');

        //by class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]');

        //by tag name and attribute with value
        cy.get('input[placeholder = "Email"]');

        //by 2 different attributes
        cy.get('[placeholder = "Email"][fullwidth][type="email"]');

        //by tag name, attribute with value, id and class name,
        cy.get('input[placeholder = "Email"]#inputEmail1.input-full-width');

        //the most recommended way by cypress
        cy.get('[data-cy="imputEmail1"]');
    });

    it('second test', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.get('[data-cy="signInButton"]');

        cy.contains('Sign in');
        cy.contains('[status="warning"]', 'Sign in');

        //How we search for elements in our app
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click();

        cy.contains('nb-card', 'Horizontal form')
            .find('[placeholder="Email"]')
            .type('Hello');
    });

    it('then and wrap methods', async () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //Bad approche

        // cy.contains('nb-card', 'Using the Grid')
        //     .find('[for="inputEmail1"]')
        //     .should('contain', 'Email');

        // cy.contains('nb-card', 'Using the Grid')
        //     .find('[for="inputPassword2"]')
        //     .should('contain', 'Password');

        // cy.contains('nb-card', 'Basic form')
        //     .find('[for="exampleInputEmail1"]')
        //     .should('contain', 'Email');

        // cy.contains('nb-card', 'Basic form')
        //     .find('[for="exampleInputPassword1"]')
        //     .should('contain', 'Password');

        //Cypress style
        cy.contains('nb-card', 'Using the Grid').then((firstForm) => {
            const emailLabelFirst = firstForm
                .find('[for="inputEmail1"]')
                .text();
            const passwordLabelFirst = firstForm
                .find('[for="inputPassword2"]')
                .text();

            expect(emailLabelFirst).to.equal('Email');
            expect(passwordLabelFirst).to.equal('Password');

            cy.contains('nb-card', 'Basic form').then((secondForm) => {
                const emailLabelSecond = secondForm
                    .find('[for="exampleInputEmail1"]')
                    .text();
                const passwordLabelSecond = secondForm
                    .find('[for="exampleInputPassword1"]')
                    .text();
                expect(passwordLabelFirst).to.equal(passwordLabelSecond);

                cy.wrap(secondForm)
                    .find('[for="exampleInputPassword1"]')
                    .should('contain', 'Password');
            });
        });
    });

    it('invoke command uses', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //option one
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address');

        //option two
        cy.get('[for="exampleInputEmail1"]').then((labelInput) => {
            expect(labelInput.text()).to.equal('Email address');
        });

        //option three
        cy.get('[for="exampleInputEmail1"]')
            .invoke('text')
            .then((text) => {
                expect(text).to.equal('Email address');
            });

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            // .should('contain', 'checked');
            .then((classValue) => {
                expect(classValue).to.contains('checked');
            });
    });

    it('Assert property', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

        cy.contains('nb-card', 'Common Datepicker')
            .find('[placeholder="Form Picker"]')
            .then((input) => {
                cy.wrap(input).click();
                cy.get('nb-calendar-day-picker').contains('17').click();
                cy.wrap(input)
                    .invoke('prop', 'value')
                    .should('contain', 'Nov 17, 2022');
            });
    });

    it('radio Button', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid')
            .find('[type="radio"]')
            .then((radioButtons) => {
                cy.wrap(radioButtons)
                    .first()
                    .check({ force: true })
                    .should('be.checked');

                cy.wrap(radioButtons).eq(1).check({ force: true });

                cy.wrap(radioButtons).first().should('not.be.checked');
                cy.wrap(radioButtons).eq(1).should('be.checked');
                cy.wrap(radioButtons).eq(2).should('be.disabled');
            });
    });

    it('check boxes', () => {
        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

        cy.get('[type="checkbox"]').then((checkBoxes) => {
            cy.wrap(checkBoxes).eq(0).uncheck({ force: true });
        });
    });

    it('lists and dropdowns', () => {
        cy.visit('/');

        //Only one element
        // cy.get('nav nb-select').click();
        // cy.get('.options-list').find('[ng-reflect-value="dark"]').click();
        // cy.get('nav nb-select').should('contain', 'Dark');
        // cy.get('nb-layout-header nav').should(
        //     'have.css',
        //     'background-color',
        //     'rgb(34, 43, 69)'
        // );

        //two elements
        cy.get('nav nb-select').then((dropdown) => {
            cy.wrap(dropdown).click();
            cy.get('.options-list nb-option').each((itemList, i) => {
                const itemText = itemList.text().trim();
                const colors = {
                    Light: 'rgb(255, 255, 255)',
                    Dark: 'rgb(34, 43, 69)',
                    Cosmic: 'rgb(50, 50, 89)',
                    Corporate: 'rgb(255, 255, 255)'
                };

                cy.wrap(itemList).click();
                cy.get('nb-layout-header nav').should(
                    'have.css',
                    'background-color',
                    colors[itemText]
                );
                i < 3 ? cy.wrap(dropdown).click() : null;
            });
        });
    });

    it('web tables', () => {
        cy.visit('/');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        cy.get('tbody').then((table) => {
            cy.wrap(table)
                .contains('tr', 'Larry')
                .then((tr) => {
                    cy.wrap(tr).find('.nb-edit').click();
                    cy.wrap(tr).find('[placeholder="Age"]').clear().type(25);
                    cy.wrap(tr).find('.nb-checkmark').click();
                    cy.wrap(tr).find('td').eq(6).should('contain', 25);
                });
        });

        cy.get('thead').then((thead) => {
            cy.wrap(thead).find('.ng2-smart-action-add-add').click();
            cy.wrap(thead)
                .find('tr')
                .then((tr) => {
                    cy.wrap(tr)
                        .eq(2)
                        .then((specTr) => {
                            cy.wrap(specTr)
                                .find('[placeholder="First Name"]')
                                .type('Ram');

                            cy.wrap(specTr)
                                .find('[placeholder="Last Name"]')
                                .type('Sarfian');
                            cy.wrap(specTr).find('.nb-checkmark').click();
                        });
                });
        });

        cy.get('tbody').then((tbody) => {
            cy.wrap(tbody)
                .contains('tr', 'Ram', 'Sarfian')
                .then((tr) => {
                    cy.wrap(tr).find('td').eq(2).should('contain', 'Ram');
                    cy.wrap(tr).find('td').eq(3).should('contain', 'Sarfian');
                });
        });

        //3
        const ages = [20, 30, 40, 200];
        cy.wrap(ages).each((age) => {
            cy.get('thead [placeholder="Age"]').clear().type(age).wait(500);

            cy.get('tbody tr').each((tableTr) => {
                if (age === 200) {
                    cy.wrap(tableTr).should('contain', 'No data found');
                } else {
                    cy.wrap(tableTr).find('td').eq(6).should('contain', age);
                }
            });
        });
    });

    it('Date picker', () => {
        let date = new Date();
        date.setDate(date.getDate() + 200);
        let futureDay = date.getDate();
        let futureMonth = date.toLocaleString('default', { month: 'short' });
        let futureYear = date.getFullYear();
        let expectedDate = `${futureMonth} ${futureDay}, ${futureYear}`;

        function selectDayFromCurrent() {
            cy.get('nb-calendar-pageable-navigation')
                .invoke('attr', 'ng-reflect-date')
                .then((dateAttribute) => {
                    if (!dateAttribute.includes(futureMonth)) {
                        cy.get(
                            '[ng-reflect-icon="chevron-right-outline"]'
                        ).click();
                        selectDayFromCurrent();
                    } else {
                        cy.get(
                            'nb-calendar-picker [class="day-cell ng-star-inserted"]'
                        )
                            .contains(futureDay)
                            .click();
                    }
                });
        }

        cy.visit('/');
        cy.contains('Form').click();
        cy.contains('Datepicker').click();

        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then((input) => {
                cy.wrap(input).click();

                selectDayFromCurrent();
                cy.wrap(input)
                    .invoke('prop', 'value')
                    .should('contain', expectedDate);

                // expect(input).to.have.value(expectedDate);
                cy.wrap(input).should('have.value', expectedDate);
            });
    });

    it('tootips', () => {
        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Tooltip').click();

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('button', 'Default')
            .click();

        cy.get('nb-tooltip').should('contain', 'This is a tooltip');
    });

    it('dialogbox', () => {
        cy.visit('/');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        //option 1 - not good
        // cy.get('.nb-trash').eq(0).click();
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Are you sure you want to delete?');
        // });

        //click cancel
        // cy.get('.nb-trash').eq(0).click();
        // cy.on('window:confirm', () => false);

        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('.nb-trash')
            .eq(0)
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith(
                    'Are you sure you want to delete?'
                );
            });
    });

    it.only('cypress assertion', () => {
        cy.visit('/');
    });
});
