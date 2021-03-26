/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */ 

const isLoggedIn = require("../api/policies/isLoggedIn");
const formCheck = require("../api/policies/formCheck");
const trainingCheck = require("../api/policies/trainingCheck");
const membershipAccess = require("../api/policies/membershipAccess");
const membershipCheck = require("../api/policies/membershipCheck");
const specialMembershipCheck = require("../api/policies/specialMembershipCheck");
const membershipForm = require("../api/policies/membershipForm");

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  'account/signup2':formCheck,
  'account/detailsuser':isLoggedIn,
  'account/userwallet': isLoggedIn,
  'account/trainer': ['isloggedIn', 'membershipCheck'],
  'account/trainer2':trainingCheck,
  'membership/getmembership': membershipAccess,
  'dev/getspecialmembership': isLoggedIn,
  'membership/getspecialmembership': membershipAccess,
  // 'membership/getspecialmembership': specialMembershipCheck,
  'membership/createmembership2': membershipForm,
  
};

