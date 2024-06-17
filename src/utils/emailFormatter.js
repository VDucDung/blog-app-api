const emailFormatter = (email) => {
  let [username, domain] = email.split('@');

  if (domain === 'googlemail.com' || domain === 'gmail.com') {
    domain = 'gmail.com';
    return (username.replaceAll(/\./g, '') + '@' + domain).toLowerCase();
  }

  return email.toLowerCase();
};

module.exports = emailFormatter;
