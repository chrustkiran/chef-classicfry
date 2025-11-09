import { Amplify } from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';


const awsConfig = {
  Auth: {
    region: 'eu-west-2',
    userPoolId: 'eu-west-2_Qx76tvZY3',
    userPoolWebClientId: '27ti07td7i4nr5283f9uvmcbab',
    mandatorySignIn: true
  }
};

Amplify.configure(awsConfig);
Auth.configure(awsConfig);

export { Auth };