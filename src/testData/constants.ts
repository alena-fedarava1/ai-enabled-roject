export const TestData = {
  products: {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light',
  },
  login: {
    invalidUsername: 'invalid_user',
    invalidPassword: 'invalid_pass',
    errorMessage: 'Username and password do not match',
  },
  urls: {
    inventory: /inventory/,
    checkoutInformationPage: /checkout-step-one/,
    checkoutOverviewPage: /checkout-step-two/,
  },
  checkout: {
    validFormData: {
      firstName: 'John',
      lastName: 'Doe',
      zip: '12345',
    },
    emptyFieldValidations: [
      {
        firstName: '',
        lastName: 'Doe',
        zip: '12345',
        errorMessage: 'First Name is required',
      },
      {
        firstName: 'John',
        lastName: '',
        zip: '12345',
        errorMessage: 'Last Name is required',
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        zip: '',
        errorMessage: 'Postal Code is required',
      },
    ],
  },
};
