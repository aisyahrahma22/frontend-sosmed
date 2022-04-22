export default function validateInfo(values) {
    let errors = {};
  
    if (!values.username.match("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{4,}")) {
        errors.username = 'Username should be contain uppercase, number, and symbol';
    }

    if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    if (!values.username.match("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{4,}")) {
        errors.username = 'Username should be contain uppercase, number, and symbol';
    }

    if (!values.password.match("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}")) {
        errors.username = 'Password should be contain uppercase, number, and symbol';
    }
     
    if(values.password.length < 8) {
        errors.password = 'Password week, and more characters';
      }
    
    if(values.password !== values.passwordConf) {
     errors.passwordConf = 'Passwords do not match';
    }

    return errors;
}