export default {

  __users: {
    "bbabics": {
      email: "bbabics@gmail.com",
      first_name: "Ben",
      last_name:  "Babics",
    },
    "jmccutchen": {
      email: "jmccutchen@stopgolove.com",
      first_name: "Jason",
      last_name:  "McCutchen",
    },
    "matth": {
      email: "matth@highsailsmedia.com",
      first_name: "Matt",
      last_name:  "Hersee",
    },
  },
  
  __accounts: {
    "highsailsmedia": {
      __roles: {
        "jmccutchen": {
          role: "admin",
        },
        "matth": {
          role: "editor",
        },
        "bbabics": {
          role: "editor",
        },
      },

      __brands: {
        "stopgolove": {
          name: "StopGoLove",
        },
        "huxleyfilm": {
          name: "Huxley Film",
        },
      },

      __projects: {
        "wedding-01": {
          brand:     "stopgolove",
          subdomain: "weding-01",
        },
        "wedding-02": {
          brand:     "huxleyfilm",
          subdomain: "wedding-02",
        },
      },
    },

    "wicked3am": {
      __roles: {
        "bbabics": {
          role: "admin",
        },
        "cinman": {
          role: "admin",
        },
      },

      __brands: {
        "watchtower": {
          name: "Watch Tower",
        },
        "riddleworks": {
          name: "Riddle Works",
        },
      },
    },
  },
}