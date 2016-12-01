# dmtt
Dead Men Tell Tales

A dead man's switch service I made to play about with node.js and some JavaScript testing libraries.

Switches are set up in switchesConfig.js setting
  - The id to use
  - How long in minutes it will take the switch to go off if it does not receive a check in
  - Most importantly the action to take if the switch does go off

Switches are signaled by checking in using the id of the switch, by default it's port 3000, /checkin, using id as the query string parameter e.g. http://localhost:3000/checkin?id=test_id
