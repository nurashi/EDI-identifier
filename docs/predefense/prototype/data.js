window.EDI_DATA = {
  "guides": {
    "chr-214": {
      "guide": {
        "id": "chr-214",
        "partner": "C.H. Robinson",
        "partner_role": "3pl",
        "transaction_set": "214",
        "version": "004010",
        "modes": [
          "truckload"
        ],
        "revision": "1.7 Final",
        "revision_date": "2022-09-13",
        "source": {
          "url": "https://www.chrobinson.com/en-us/-/media/chrobinson/documents/carrier-specs-docs/carrier-specs-dec-2020/chr-truckload-tl-carrier-x12-214.pdf",
          "sha256": "0d28243812f1bac25b550008054c59e652061688da47b15665a39f412d883eaa",
          "retrieved": "2026-10-19",
          "pages": 32
        }
      },
      "by_key": {
        "B10@020": {
          "key": {
            "segment": "B10",
            "position": "020"
          },
          "usage": {
            "base": "M",
            "declared": "required",
            "declared_label": "Used"
          },
          "max_use": 1,
          "conditions": [
            {
              "kind": "syntax",
              "text": "E0105 - Only one of B1001 or B1005 may be present."
            },
            {
              "kind": "syntax",
              "text": "P0506 - If either B1005 or B1006 is present, then the other is required."
            },
            {
              "kind": "syntax",
              "text": "R0106 - At least one of B1001 or B1006 is required."
            }
          ],
          "evidence": [
            {
              "page": 3,
              "excerpt": "020 B10 Beginning Segment for M 1 Used",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 11,
              "excerpt": "Pos: 020 Max: 1 / User Option (Usage): Used",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 11,
              "excerpt": "E0105 - Only one of B1001 or B1005 may be present. / P0506 - If either B1005 or B1006 is present, then the other is required. / R0106 - At least one of B1001 or B1006 is required.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "B10@020/B1001": {
          "key": {
            "segment": "B10",
            "position": "020",
            "element": "B1001"
          },
          "usage": {
            "base": "M",
            "declared": "required",
            "declared_label": "Used"
          },
          "evidence": [
            {
              "page": 11,
              "excerpt": "B1001 127 Reference Identification M AN 1/30 Used",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "B10@020/B1002": {
          "key": {
            "segment": "B10",
            "position": "020",
            "element": "B1002"
          },
          "usage": {
            "base": "O",
            "declared": "optional",
            "declared_label": "Used"
          },
          "evidence": [
            {
              "page": 11,
              "excerpt": "B1002 145 Shipment Identification Number O AN 1/30 Used",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "B10@020/B1003": {
          "key": {
            "segment": "B10",
            "position": "020",
            "element": "B1003"
          },
          "usage": {
            "base": "M",
            "declared": "required",
            "declared_label": "Used"
          },
          "codes": {
            "mode": "unspecified"
          },
          "evidence": [
            {
              "page": 11,
              "excerpt": "B1003 140 Standard Carrier Alpha Code M ID 2/4 Used",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "L11@030": {
          "key": {
            "segment": "L11",
            "position": "030"
          },
          "usage": {
            "base": "O",
            "declared": "required",
            "declared_label": "Must use"
          },
          "max_use": 300,
          "conditions": [
            {
              "kind": "semantic",
              "text": "AG - Qualifer is MANDATORY on all 214's."
            },
            {
              "kind": "syntax",
              "text": "P0102 - If either L1101 or L1102 is present, then the other is required."
            },
            {
              "kind": "syntax",
              "text": "R0103 - At least one of L1101 or L1103 is required."
            }
          ],
          "evidence": [
            {
              "page": 3,
              "excerpt": "030 L11 Business Instructions and O 300 Must use",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 12,
              "excerpt": "Pos: 030 Max: 300 / User Option (Usage): Must use",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 12,
              "excerpt": "P0102 - If either L1101 or L1102 is present, then the other is required. / R0103 - At least one of L1101 or L1103 is required. / AG - Qualifer is MANDATORY on all 214's.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "L11@030/L1101": {
          "key": {
            "segment": "L11",
            "position": "030",
            "element": "L1101"
          },
          "usage": {
            "base": "X",
            "declared": "required",
            "declared_label": "Must use"
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "C.H. Robinson Load Number - AG Qualifier (Should match the Load Number in the B10_02)"
            }
          ],
          "evidence": [
            {
              "page": 12,
              "excerpt": "L1101 127 Reference Identification X AN 1/30 Must use",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 12,
              "excerpt": "User Note 1: C.H. Robinson Load Number - AG Qualifier (Should match the Load / Number in the B10_02)",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "L11@030/L1102": {
          "key": {
            "segment": "L11",
            "position": "030",
            "element": "L1102"
          },
          "usage": {
            "base": "X",
            "declared": "required",
            "declared_label": "Must use"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "AG"
            ],
            "standard_total": 1503
          },
          "evidence": [
            {
              "page": 12,
              "excerpt": "L1102 128 Reference Identification Qualifier X ID 2/3 Must use",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 12,
              "excerpt": "Code List Summary (Total Codes: 1503, Included: 1) / AG Agent's Shipment Number",
              "supports": [
                "codes"
              ]
            }
          ]
        },
        "0200:LX@130": {
          "key": {
            "segment": "LX",
            "position": "130",
            "loop": [
              "0200"
            ]
          },
          "usage": {
            "base": "O",
            "declared": "required",
            "declared_label": "Must use"
          },
          "max_use": 1,
          "loop_repeat": 1,
          "conditions": [
            {
              "kind": "semantic",
              "text": "If using the L11 segments to send Lat/Long, you do not need to use both formats. Please choose only one."
            }
          ],
          "evidence": [
            {
              "page": 3,
              "excerpt": "LOOP ID - 0200 1 / 130 LX Assigned Number O 1 Must use",
              "supports": [
                "usage",
                "max_use",
                "loop_repeat"
              ]
            },
            {
              "page": 4,
              "excerpt": "Only one status per 214 / A single 214 may contain 1 LX Loop with 1 AT7 Loop.",
              "supports": [
                "loop_repeat"
              ]
            },
            {
              "page": 19,
              "excerpt": "Pos: 130 Max: 1 / User Option (Usage): Must use / Maximum of 1 LX Loop.",
              "supports": [
                "usage",
                "max_use",
                "loop_repeat"
              ]
            },
            {
              "page": 19,
              "excerpt": "If using the L11 segments to send Lat/Long, you do not need to use both formats. Please choose only / one.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200:LX@130/LX01": {
          "key": {
            "segment": "LX",
            "position": "130",
            "loop": [
              "0200"
            ],
            "element": "LX01"
          },
          "usage": {
            "base": "M",
            "declared": "required",
            "declared_label": "Used"
          },
          "evidence": [
            {
              "page": 19,
              "excerpt": "LX01 554 Assigned Number M N0 1/6 Used",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200/0205:AT7@140": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ]
          },
          "usage": {
            "base": "O",
            "declared": "required",
            "declared_label": "Must use"
          },
          "max_use": 1,
          "loop_repeat": 1,
          "conditions": [
            {
              "kind": "syntax",
              "text": "C0605 - If AT706 is present, then AT705 is required."
            },
            {
              "kind": "syntax",
              "text": "C0706 - If AT707 is present, then AT706 is required."
            },
            {
              "kind": "syntax",
              "text": "E0103 - Only one of AT701 or AT703 may be present."
            },
            {
              "kind": "syntax",
              "text": "P0102 - If either AT701 or AT702 is present, then the other is required."
            },
            {
              "kind": "syntax",
              "text": "P0304 - If either AT703 or AT704 is present, then the other is required."
            }
          ],
          "evidence": [
            {
              "page": 3,
              "excerpt": "LOOP ID - 0205 1 / 140 AT7 Shipment Status Details O 1 Must use",
              "supports": [
                "usage",
                "max_use",
                "loop_repeat"
              ]
            },
            {
              "page": 20,
              "excerpt": "Pos: 140 Repeat: 1 / Loop Shipment Status Details Mandatory",
              "supports": [
                "loop_repeat"
              ]
            },
            {
              "page": 21,
              "excerpt": "Pos: 140 Max: 1 / User Option (Usage): Must use",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 22,
              "excerpt": "C0605 - If AT706 is present, then AT705 is required. / C0706 - If AT707 is present, then AT706 is required. / E0103 - Only one of AT701 or AT703 may be present. / P0102 - If either AT701 or AT702 is present, then the other is required. / P0304 - If either AT703 or AT704 is present, then the other is required.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT701": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT701"
          },
          "usage": {
            "base": "X",
            "declared": "conditional",
            "declared_label": "Used"
          },
          "codes": {
            "mode": "all_standard",
            "standard_total": 42
          },
          "conditions": [
            {
              "kind": "context",
              "text": "At a minimum C.H. Robinson must receive the X3 & AF for every Pick Up location and X1 & CD for every Delivery location on all shipments."
            },
            {
              "kind": "timing",
              "text": "Ideally within 15 minutes of the event."
            },
            {
              "kind": "timing",
              "text": "C.H. Robinson wants to recieve In-Transit updates every 15 minutes in the form of an X6 status code."
            }
          ],
          "evidence": [
            {
              "page": 21,
              "excerpt": "AT701 1650 Shipment Status Code X ID 2/2 Used",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 21,
              "excerpt": "All valid standard codes are used. (Total Codes: 42)",
              "supports": [
                "codes"
              ]
            },
            {
              "page": 21,
              "excerpt": "- At a minimum C.H. Robinson must receive the X3 & AF for every Pick Up location / and X1 & CD for every Delivery location on all shipments. Ideally within 15 minutes / of the event. / - C.H. Robinson wants to recieve In-Transit updates every 15 minutes in the form / of an X6 status code.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT702": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT702"
          },
          "usage": {
            "base": "X",
            "declared": "conditional",
            "declared_label": "Used"
          },
          "codes": {
            "mode": "all_standard",
            "standard_total": 86
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "NS - Normal Status or any Late Reason Code if necessary"
            }
          ],
          "evidence": [
            {
              "page": 21,
              "excerpt": "AT702 1651 Shipment Status or Appointment X ID 2/2 Used",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 21,
              "excerpt": "User Note 1: NS - Normal Status or any Late Reason Code if necessary",
              "supports": [
                "conditions"
              ]
            },
            {
              "page": 21,
              "excerpt": "All valid standard codes are used. (Total Codes: 86)",
              "supports": [
                "codes"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT703": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT703"
          },
          "usage": {
            "base": "X",
            "declared": "conditional",
            "declared_label": "Used"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "AA",
              "AB"
            ],
            "standard_total": 9
          },
          "evidence": [
            {
              "page": 21,
              "excerpt": "AT703 1652 Shipment Appointment Status Code X ID 2/2 Used",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 21,
              "excerpt": "Code List Summary (Total Codes: 9, Included: 2) / AA Pick-up Appointment Date and/or Time / AB Delivery Appointment Date and/or Time",
              "supports": [
                "codes"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT704": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT704"
          },
          "usage": {
            "base": "X",
            "declared": "conditional",
            "declared_label": "Used"
          },
          "codes": {
            "mode": "all_standard",
            "standard_total": 86
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "NA - Normal Appointment or any Late Reason Code if necessary"
            }
          ],
          "evidence": [
            {
              "page": 21,
              "excerpt": "AT704 1651 Shipment Status or Appointment X ID 2/2 Used",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 21,
              "excerpt": "User Note 1: NA - Normal Appointment or any Late Reason Code if necessary",
              "supports": [
                "conditions"
              ]
            },
            {
              "page": 21,
              "excerpt": "All valid standard codes are used. (Total Codes: 86)",
              "supports": [
                "codes"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT705": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT705"
          },
          "usage": {
            "base": "X",
            "declared": "required",
            "declared_label": "Must use"
          },
          "evidence": [
            {
              "page": 21,
              "excerpt": "AT705 373 Status Date X DT 8/8 Must use",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT706": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT706"
          },
          "usage": {
            "base": "X",
            "declared": "required",
            "declared_label": "Must use"
          },
          "evidence": [
            {
              "page": 21,
              "excerpt": "AT706 337 Status Time X TM 4/8 Must use",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT707": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT707"
          },
          "usage": {
            "base": "X",
            "declared": "conditional",
            "declared_label": "Used"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "LT"
            ],
            "standard_total": 51
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "The status time represents the local time the status occurred."
            }
          ],
          "evidence": [
            {
              "page": 22,
              "excerpt": "AT707 623 Time Code X ID 2/2 Used",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 22,
              "excerpt": "The status time represents the local time the status occurred.",
              "supports": [
                "conditions"
              ]
            },
            {
              "page": 22,
              "excerpt": "Code List Summary (Total Codes: 51, Included: 1) / LT Local Time",
              "supports": [
                "codes"
              ]
            }
          ]
        },
        "0200/0205:MS1@143": {
          "key": {
            "segment": "MS1",
            "position": "143",
            "loop": [
              "0200",
              "0205"
            ]
          },
          "usage": {
            "base": "O",
            "declared": "required",
            "declared_label": "Must use"
          },
          "max_use": 1,
          "conditions": [
            {
              "kind": "syntax",
              "text": "C0201 - If MS102 is present, then MS101 is required."
            },
            {
              "kind": "syntax",
              "text": "C0301 - If MS103 is present, then MS101 is required."
            },
            {
              "kind": "syntax",
              "text": "C0604 - If MS106 is present, then MS104 is required."
            },
            {
              "kind": "syntax",
              "text": "C0705 - If MS107 is present, then MS105 is required."
            },
            {
              "kind": "syntax",
              "text": "E0104 - Only one of MS101 or MS104 may be present."
            },
            {
              "kind": "syntax",
              "text": "P0405 - If either MS104 or MS105 is present, then the other is required."
            },
            {
              "kind": "syntax",
              "text": "L010203 - If MS101 is present, then at least one of MS102 or MS103 is required."
            }
          ],
          "evidence": [
            {
              "page": 3,
              "excerpt": "143 MS1 Equipment, Shipment, or O 1 Must use",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 23,
              "excerpt": "Pos: 143 Max: 1 / User Option (Usage): Must use",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 23,
              "excerpt": "C0201 - If MS102 is present, then MS101 is required. / C0301 - If MS103 is present, then MS101 is required. / C0604 - If MS106 is present, then MS104 is required. / C0705 - If MS107 is present, then MS105 is required. / E0104 - Only one of MS101 or MS104 may be present. / P0405 - If either MS104 or MS105 is present, then the other is required. / L010203 - If MS101 is present, then at least one of MS102 or MS103 is required.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200/0205:MS1@143/MS101": {
          "key": {
            "segment": "MS1",
            "position": "143",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS101"
          },
          "usage": {
            "base": "X",
            "declared": "required",
            "declared_label": "Must use"
          },
          "evidence": [
            {
              "page": 23,
              "excerpt": "MS101 19 City Name X AN 2/30 Must use",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200/0205:MS1@143/MS102": {
          "key": {
            "segment": "MS1",
            "position": "143",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS102"
          },
          "usage": {
            "base": "X",
            "declared": "required",
            "declared_label": "Must use"
          },
          "codes": {
            "mode": "unspecified"
          },
          "evidence": [
            {
              "page": 23,
              "excerpt": "MS102 156 State or Province Code X ID 2/2 Must use",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "0200/0205:MS1@143/MS103": {
          "key": {
            "segment": "MS1",
            "position": "143",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS103"
          },
          "usage": {
            "base": "X",
            "declared": "conditional",
            "declared_label": "Used"
          },
          "codes": {
            "mode": "unspecified"
          },
          "evidence": [
            {
              "page": 23,
              "excerpt": "MS103 26 Country Code X ID 2/3 Used",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "0200/0205:MS2@146": {
          "key": {
            "segment": "MS2",
            "position": "146",
            "loop": [
              "0200",
              "0205"
            ]
          },
          "usage": {
            "base": "O",
            "declared": "optional",
            "declared_label": "Used"
          },
          "max_use": 1,
          "conditions": [
            {
              "kind": "syntax",
              "text": "C0402 - If MS204 is present, then MS202 is required."
            },
            {
              "kind": "syntax",
              "text": "P0102 - If either MS201 or MS202 is present, then the other is required."
            }
          ],
          "evidence": [
            {
              "page": 3,
              "excerpt": "146 MS2 Equipment or Container O 1 Used",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 24,
              "excerpt": "Pos: 146 Max: 1 / User Option (Usage): Used",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 24,
              "excerpt": "C0402 - If MS204 is present, then MS202 is required. / P0102 - If either MS201 or MS202 is present, then the other is required.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200/0205:MS2@146/MS201": {
          "key": {
            "segment": "MS2",
            "position": "146",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS201"
          },
          "usage": {
            "base": "X",
            "declared": "conditional",
            "declared_label": "Used"
          },
          "codes": {
            "mode": "unspecified"
          },
          "evidence": [
            {
              "page": 24,
              "excerpt": "MS201 140 Standard Carrier Alpha Code X ID 2/4 Used",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "0200/0205:MS2@146/MS202": {
          "key": {
            "segment": "MS2",
            "position": "146",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS202"
          },
          "usage": {
            "base": "X",
            "declared": "conditional",
            "declared_label": "Used"
          },
          "evidence": [
            {
              "page": 24,
              "excerpt": "MS202 207 Equipment Number X AN 1/10 Used",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200/0205:MS2@146/MS203": {
          "key": {
            "segment": "MS2",
            "position": "146",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS203"
          },
          "usage": {
            "base": "O",
            "declared": "not_used",
            "declared_label": "Not used"
          },
          "codes": {
            "mode": "all_standard",
            "standard_total": 134
          },
          "evidence": [
            {
              "page": 24,
              "excerpt": "MS203 40 Equipment Description Code O ID 2/2 Not used",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 24,
              "excerpt": "All valid standard codes are used. (Total Codes: 134)",
              "supports": [
                "codes"
              ]
            }
          ]
        },
        "0200/0205:MS2@146/MS204": {
          "key": {
            "segment": "MS2",
            "position": "146",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS204"
          },
          "usage": {
            "base": "X",
            "declared": "not_used",
            "declared_label": "Not used"
          },
          "evidence": [
            {
              "page": 24,
              "excerpt": "MS204 761 Equipment Number Check Digit X N0 1/1 Not used",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200:L11@150[QN]": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ],
            "qualifier": [
              "QN"
            ]
          },
          "usage": {
            "base": "O",
            "declared": "required",
            "declared_label": "Must use"
          },
          "max_use": 1,
          "conditions": [
            {
              "kind": "context",
              "text": "QN - Location Stop Sequence Number is MANDATORY for TRUCKLOAD Carriers."
            },
            {
              "kind": "semantic",
              "text": "The stop number must match the stop sequence number that corresponds to the location on the load."
            },
            {
              "kind": "semantic",
              "text": "If you receive the load via 204 the location stop sequence number is in the S5_01."
            },
            {
              "kind": "semantic",
              "text": "C.H. Robinson does not accept '99' as the final stop."
            },
            {
              "kind": "syntax",
              "text": "P0102 - If either L1101 or L1102 is present, then the other is required."
            },
            {
              "kind": "syntax",
              "text": "R0103 - At least one of L1101 or L1103 is required."
            }
          ],
          "evidence": [
            {
              "page": 3,
              "excerpt": "150 L11 Business Instructions and O 1 Must use",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 25,
              "excerpt": "Pos: 150 Max: 1 / User Option (Usage): Must use / QN Stop Sequence Number",
              "supports": [
                "key",
                "usage",
                "max_use"
              ]
            },
            {
              "page": 25,
              "excerpt": "QN - Location Stop Sequence Number is MANDATORY for TRUCKLOAD Carriers. / The stop number must match the stop sequence number that corresponds to the location on the load. / If you receive the load via 204 the location stop sequence number is in the S5_01. C.H. Robinson does / not accept '99' as the final stop.",
              "supports": [
                "conditions"
              ]
            },
            {
              "page": 25,
              "excerpt": "P0102 - If either L1101 or L1102 is present, then the other is required. / R0103 - At least one of L1101 or L1103 is required.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200:L11@150[QN]/L1101": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ],
            "element": "L1101",
            "qualifier": [
              "QN"
            ]
          },
          "usage": {
            "base": "X",
            "declared": "required",
            "declared_label": "Must use"
          },
          "evidence": [
            {
              "page": 25,
              "excerpt": "L1101 127 Reference Identification X AN 1/30 Must use",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200:L11@150[QN]/L1102": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ],
            "element": "L1102",
            "qualifier": [
              "QN"
            ]
          },
          "usage": {
            "base": "X",
            "declared": "required",
            "declared_label": "Must use"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "QN"
            ],
            "standard_total": 1503
          },
          "evidence": [
            {
              "page": 25,
              "excerpt": "L1102 128 Reference Identification Qualifier X ID 2/3 Must use",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 25,
              "excerpt": "Code List Summary (Total Codes: 1503, Included: 1) / QN Stop Sequence Number",
              "supports": [
                "codes"
              ]
            }
          ]
        },
        "0200:L11@150[LK,LQ]": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ],
            "qualifier": [
              "LK",
              "LQ"
            ]
          },
          "usage": {
            "base": "O",
            "declared": "recommended",
            "declared_label": "Recommended"
          },
          "max_use": 2,
          "conditions": [
            {
              "kind": "semantic",
              "text": "Sending Lat/Long does not replace the requirement for sending city/state in the MS1."
            },
            {
              "kind": "syntax",
              "text": "P0102 - If either L1101 or L1102 is present, then the other is required."
            },
            {
              "kind": "syntax",
              "text": "R0103 - At least one of L1101 or L1103 is required."
            }
          ],
          "evidence": [
            {
              "page": 3,
              "excerpt": "150 L11 Business Instructions and O 2 Recommended",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 26,
              "excerpt": "Pos: 150 Max: 2 / User Option (Usage): Recommended",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 26,
              "excerpt": "Sending Lat/Long does not replace the requirement for sending city/state in the MS1. / P0102 - If either L1101 or L1102 is present, then the other is required. / R0103 - At least one of L1101 or L1103 is required.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200:L11@150[LK,LQ]/L1101": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ],
            "element": "L1101",
            "qualifier": [
              "LK",
              "LQ"
            ]
          },
          "usage": {
            "base": "X",
            "declared": "required",
            "declared_label": "Must use"
          },
          "evidence": [
            {
              "page": 26,
              "excerpt": "L1101 127 Reference Identification X AN 1/30 Must use",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200:L11@150[LK,LQ]/L1102": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ],
            "element": "L1102",
            "qualifier": [
              "LK",
              "LQ"
            ]
          },
          "usage": {
            "base": "X",
            "declared": "required",
            "declared_label": "Must use"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "LK",
              "LQ"
            ],
            "standard_total": 1503
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "Send Longitude in following format: degrees (3 positions), minutes (2 positions), and seconds (2 positions)."
            },
            {
              "kind": "semantic",
              "text": "Send Latitude in following format: degrees (2 positions), minutes (2 positions), and seconds (2 positions)."
            }
          ],
          "evidence": [
            {
              "page": 26,
              "excerpt": "L1102 128 Reference Identification Qualifier X ID 2/3 Must use",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 26,
              "excerpt": "Code List Summary (Total Codes: 1503, Included: 2) / LK Longitude expressed in Degrees, Minutes and Seconds / LQ Latitude Expressed in Degrees, Minutes and Seconds",
              "supports": [
                "key",
                "codes"
              ]
            },
            {
              "page": 26,
              "excerpt": "Send Longitude in following format: degrees (3 positions), minutes (2 / positions), and seconds (2 positions). / Send Latitude in following format: degrees (2 positions), minutes (2",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200:L11@150[LK,LQ]/L1103": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ],
            "element": "L1103",
            "qualifier": [
              "LK",
              "LQ"
            ]
          },
          "usage": {
            "base": "X",
            "declared": "conditional",
            "declared_label": "Used"
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "When L11/02 is \"LK\" . Please define East/West using \"E\" or \"W\"."
            },
            {
              "kind": "semantic",
              "text": "When L11/02 is \"LQ\". Please define North/South using \"N\" or \"S\"."
            }
          ],
          "evidence": [
            {
              "page": 26,
              "excerpt": "L1103 352 Description X AN 1/80 Used",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 26,
              "excerpt": "User Note 1: When L11/02 is \"LK\" . Please define East/West using \"E\" or \"W\". / When L11/02 is \"LQ\". Please define North/South using \"N\" or \"S\".",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200:L11@150[LH,LL]": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ],
            "qualifier": [
              "LH",
              "LL"
            ]
          },
          "usage": {
            "base": "O",
            "declared": "recommended",
            "declared_label": "Recommended"
          },
          "max_use": 2,
          "conditions": [
            {
              "kind": "semantic",
              "text": "Sending Lat/Long does not replace the requirement for sending city/state in the MS1."
            },
            {
              "kind": "syntax",
              "text": "P0102 - If either L1101 or L1102 is present, then the other is required."
            },
            {
              "kind": "syntax",
              "text": "R0103 - At least one of L1101 or L1103 is required."
            }
          ],
          "evidence": [
            {
              "page": 3,
              "excerpt": "150 L11 Business Instructions and O 2 Recommended",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 27,
              "excerpt": "Pos: 150 Max: 2 / User Option (Usage): Recommended",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 27,
              "excerpt": "Sending Lat/Long does not replace the requirement for sending city/state in the MS1. / P0102 - If either L1101 or L1102 is present, then the other is required. / R0103 - At least one of L1101 or L1103 is required.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200:L11@150[LH,LL]/L1101": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ],
            "element": "L1101",
            "qualifier": [
              "LH",
              "LL"
            ]
          },
          "usage": {
            "base": "X",
            "declared": "required",
            "declared_label": "Must use"
          },
          "evidence": [
            {
              "page": 27,
              "excerpt": "L1101 127 Reference Identification X AN 1/30 Must use",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200:L11@150[LH,LL]/L1102": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ],
            "element": "L1102",
            "qualifier": [
              "LH",
              "LL"
            ]
          },
          "usage": {
            "base": "X",
            "declared": "required",
            "declared_label": "Must use"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "LH",
              "LL"
            ],
            "standard_total": 1503
          },
          "evidence": [
            {
              "page": 27,
              "excerpt": "L1102 128 Reference Identification Qualifier X ID 2/3 Must use",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 27,
              "excerpt": "Code List Summary (Total Codes: 1503, Included: 2) / LH Longitude Expressed in Seconds / LL Latitude Expressed in Seconds",
              "supports": [
                "key",
                "codes"
              ]
            }
          ]
        },
        "0200:L11@150[VT]": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ],
            "qualifier": [
              "VT"
            ]
          },
          "usage": {
            "base": "O",
            "declared": "required",
            "declared_label": "Must use"
          },
          "max_use": 1,
          "conditions": [
            {
              "kind": "syntax",
              "text": "P0102 - If either L1101 or L1102 is present, then the other is required."
            },
            {
              "kind": "syntax",
              "text": "R0103 - At least one of L1101 or L1103 is required."
            }
          ],
          "evidence": [
            {
              "page": 3,
              "excerpt": "150 L11 Business Instructions and O 1 Must use",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 28,
              "excerpt": "Pos: 150 Max: 1 / User Option (Usage): Must use",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 28,
              "excerpt": "P0102 - If either L1101 or L1102 is present, then the other is required. / R0103 - At least one of L1101 or L1103 is required.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200:L11@150[VT]/L1101": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ],
            "element": "L1101",
            "qualifier": [
              "VT"
            ]
          },
          "usage": {
            "base": "X",
            "declared": "conditional",
            "declared_label": "Used"
          },
          "evidence": [
            {
              "page": 28,
              "excerpt": "L1101 127 Reference Identification X AN 1/30 Used",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200:L11@150[VT]/L1102": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ],
            "element": "L1102",
            "qualifier": [
              "VT"
            ]
          },
          "usage": {
            "base": "X",
            "declared": "conditional",
            "declared_label": "Used"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "VT"
            ],
            "standard_total": 1503
          },
          "evidence": [
            {
              "page": 28,
              "excerpt": "L1102 128 Reference Identification Qualifier X ID 2/3 Used",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 28,
              "excerpt": "Code List Summary (Total Codes: 1503, Included: 1) / VT Motor Vehicle ID Number",
              "supports": [
                "key",
                "codes"
              ]
            }
          ]
        },
        "0200:AT8@200": {
          "key": {
            "segment": "AT8",
            "position": "200",
            "loop": [
              "0200"
            ]
          },
          "usage": {
            "base": "O",
            "declared": "optional",
            "declared_label": "Used"
          },
          "max_use": 10,
          "conditions": [
            {
              "kind": "syntax",
              "text": "P0607 - If either AT806 or AT807 is present, then the other is required."
            },
            {
              "kind": "syntax",
              "text": "P010203 - If either AT801, AT802 or AT803 are present, then the others are required."
            }
          ],
          "evidence": [
            {
              "page": 3,
              "excerpt": "200 AT8 Shipment Weight, O 10 Used",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 29,
              "excerpt": "Pos: 200 Max: 10 / User Option (Usage): Used",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 29,
              "excerpt": "P0607 - If either AT806 or AT807 is present, then the other is required. / P010203 - If either AT801, AT802 or AT803 are present, then the others are required.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200:AT8@200/AT801": {
          "key": {
            "segment": "AT8",
            "position": "200",
            "loop": [
              "0200"
            ],
            "element": "AT801"
          },
          "usage": {
            "base": "X",
            "declared": "conditional",
            "declared_label": "Used"
          },
          "codes": {
            "mode": "all_standard",
            "standard_total": 51
          },
          "evidence": [
            {
              "page": 29,
              "excerpt": "AT801 187 Weight Qualifier X ID 1/2 Used / All valid standard codes are used. (Total Codes: 51)",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "0200:AT8@200/AT802": {
          "key": {
            "segment": "AT8",
            "position": "200",
            "loop": [
              "0200"
            ],
            "element": "AT802"
          },
          "usage": {
            "base": "X",
            "declared": "conditional",
            "declared_label": "Used"
          },
          "codes": {
            "mode": "all_standard",
            "standard_total": 8
          },
          "evidence": [
            {
              "page": 29,
              "excerpt": "AT802 188 Weight Unit Code X ID 1/1 Used / All valid standard codes are used. (Total Codes: 8)",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "0200:AT8@200/AT803": {
          "key": {
            "segment": "AT8",
            "position": "200",
            "loop": [
              "0200"
            ],
            "element": "AT803"
          },
          "usage": {
            "base": "X",
            "declared": "conditional",
            "declared_label": "Used"
          },
          "evidence": [
            {
              "page": 29,
              "excerpt": "AT803 81 Weight X R 1/10 Used",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200:AT8@200/AT804": {
          "key": {
            "segment": "AT8",
            "position": "200",
            "loop": [
              "0200"
            ],
            "element": "AT804"
          },
          "usage": {
            "base": "O",
            "declared": "optional",
            "declared_label": "Used"
          },
          "evidence": [
            {
              "page": 29,
              "excerpt": "AT804 80 Lading Quantity O N0 1/7 Used",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200:AT8@200/AT805": {
          "key": {
            "segment": "AT8",
            "position": "200",
            "loop": [
              "0200"
            ],
            "element": "AT805"
          },
          "usage": {
            "base": "O",
            "declared": "optional",
            "declared_label": "Used"
          },
          "evidence": [
            {
              "page": 29,
              "excerpt": "AT805 80 Lading Quantity O N0 1/7 Used",
              "supports": [
                "usage"
              ]
            }
          ]
        }
      }
    },
    "kbx-214": {
      "guide": {
        "id": "kbx-214",
        "partner": "KBX Technology Solutions",
        "partner_role": "3pl",
        "transaction_set": "214",
        "version": "004010",
        "modes": [
          "truckload",
          "intermodal",
          "ltl"
        ],
        "revision": "KBX_X12_4010_214, page footer dated May 9, 2022",
        "revision_date": "2023-11-09",
        "source": {
          "url": "https://kbx.com/wp-content/uploads/2025/09/KBXTECH214-1.pdf",
          "sha256": "c5e6ed5f63faf46304aa9c012b3b9ae34de44e79cc0b2d654a92b48e8f5f224e",
          "retrieved": "2026-10-19",
          "pages": 30
        }
      },
      "by_key": {
        "B10@020": {
          "key": {
            "segment": "B10",
            "position": "020"
          },
          "usage": {
            "declared": "required",
            "declared_label": "Mandatory"
          },
          "max_use": 1,
          "conditions": [
            {
              "kind": "syntax",
              "text": "B1001 is required."
            },
            {
              "kind": "syntax",
              "text": "B1002 is required when used in Transaction Set 214."
            },
            {
              "kind": "syntax",
              "text": "B1003 is required when used in Transaction Set 214."
            }
          ],
          "evidence": [
            {
              "page": 6,
              "excerpt": "15 020 B10 Beginning Segment for Transportation Carrier M 1",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 11,
              "excerpt": "Segment: B10 Beginning Segment for Transportation Carrier Shipment Status Message Position: 020 Loop: Level: Usage: Mandatory Max Use: 1",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 11,
              "excerpt": "Syntax Notes: 1 B1001 is required. / 2 B1002 is required when used in Transaction Set 214. / 3 B1003 is required when used in Transaction Set 214.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "B10@020/B1001": {
          "key": {
            "segment": "B10",
            "position": "020",
            "element": "B1001"
          },
          "usage": {
            "declared": "required",
            "declared_label": "M"
          },
          "evidence": [
            {
              "page": 11,
              "excerpt": "M B1001 127 Reference Identification M AN 1/30",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "B10@020/B1002": {
          "key": {
            "segment": "B10",
            "position": "020",
            "element": "B1002"
          },
          "usage": {
            "declared": "required",
            "declared_label": "M"
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "Shipment id (SID) from 204-B204. Must be exact."
            }
          ],
          "evidence": [
            {
              "page": 11,
              "excerpt": "M B1002 145 Shipment Identification Number M AN 1/30",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 11,
              "excerpt": "Shipment id (SID) from 204-B204. Must be exact.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "B10@020/B1003": {
          "key": {
            "segment": "B10",
            "position": "020",
            "element": "B1003"
          },
          "usage": {
            "declared": "required",
            "declared_label": "M"
          },
          "codes": {
            "mode": "unspecified"
          },
          "evidence": [
            {
              "page": 11,
              "excerpt": "M B1003 140 Standard Carrier Alpha Code M ID 2/4",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "L11@030": {
          "key": {
            "segment": "L11",
            "position": "030"
          },
          "usage": {
            "declared": "required",
            "declared_label": "Mandatory"
          },
          "max_use": 300,
          "conditions": [
            {
              "kind": "syntax",
              "text": "L1101 is required."
            },
            {
              "kind": "syntax",
              "text": "If either L1101 or L1102 is present, then the other is required."
            },
            {
              "kind": "semantic",
              "text": "The Bill of Lading number is required. From 204-L11 w/BM qualifier. Must be exact."
            },
            {
              "kind": "context",
              "text": "Continuous Move Number and Return Goods Authorization Number are optional and will only be required upon request."
            }
          ],
          "evidence": [
            {
              "page": 6,
              "excerpt": "16 030 L11 Business Instruction and Reference Number M 300",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 12,
              "excerpt": "Segment: L11 Business Instructions and Reference Number Position: 030 Loop: Level: Usage: Mandatory Max Use: 300",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 12,
              "excerpt": "Syntax Notes: 1 L1101 is required. / 2 If either L1101 or L1102 is present, then the other is required. / Comments: The Bill of Lading number is required. From 204-L11 w/BM qualifier. Must be exact. / Notes: Continuous Move Number and Return Goods Authorization Number are optional and will only be required upon request.",
              "supports": [
                "conditions"
              ]
            },
            {
              "page": 2,
              "excerpt": "5/3/2022 Update L11 Header position 030 L1101, L1102 L11*4F updated to optional in / 5/4/2022 Correction L11 Header position 030 L1101, L1102 Updated L11 segment back to / mandatory to avoid confusion / surrounding L11*BM requirement",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "L11@030/L1101": {
          "key": {
            "segment": "L11",
            "position": "030",
            "element": "L1101"
          },
          "usage": {
            "declared": "required",
            "declared_label": "M"
          },
          "evidence": [
            {
              "page": 12,
              "excerpt": "M L1101 127 Reference Identification M AN 1/30",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "L11@030/L1102": {
          "key": {
            "segment": "L11",
            "position": "030",
            "element": "L1102"
          },
          "usage": {
            "declared": "required",
            "declared_label": "M"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "4F",
              "BM",
              "CMN",
              "RZ",
              "BN",
              "PO",
              "PRT",
              "RB",
              "SI",
              "VN"
            ]
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "4F Reference will be sent to a carrier in the outbound 204 from KBXTECH and should be returned on the 214 as it was sent."
            },
            {
              "kind": "context",
              "text": "Carriers who are not getting a 204 tender from KBXTECH will be instructed on the proper code to be used when sending an EDI 214 message."
            }
          ],
          "evidence": [
            {
              "page": 12,
              "excerpt": "M L1102 128 Reference Identification Qualifier M ID 2/3",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 12,
              "excerpt": "4F Carrier’s-Assigned Shipper Number / BM Bill of Lading Number / CMN Continuous Move Number / RZ Return Goods Authorization Number / BN Booking Number / PO Purchase Order Number / PRT Product Type / RB Rate Code Number / SI Shipper’s Identifying Number / VN Vendor Number",
              "supports": [
                "codes"
              ]
            },
            {
              "page": 12,
              "excerpt": "-4F Reference will be sent to a carrier in the outbound / 204 from KBXTECH and should be returned on the 214 as / it was sent. / -Carriers who are not getting a 204 tender from / KBXTECH will be instructed on the proper code to be / used when sending an EDI 214 message.",
              "supports": [
                "conditions"
              ]
            }
          ],
          "review": {
            "reason": "CMN is printed twice in the code list; it is recorded once."
          }
        },
        "0200:LX@130": {
          "key": {
            "segment": "LX",
            "position": "130",
            "loop": [
              "0200"
            ]
          },
          "usage": {
            "declared": "required",
            "declared_label": "Mandatory"
          },
          "max_use": 1,
          "loop_repeat": 1,
          "evidence": [
            {
              "page": 6,
              "excerpt": "LOOP ID – 0200 1 / 23 130 LX Assigned Number M 1",
              "supports": [
                "usage",
                "max_use",
                "loop_repeat"
              ]
            },
            {
              "page": 17,
              "excerpt": "Segment: LX Assigned Number Position: 130 Loop: 0200 Mandatory Level: Usage: Mandatory Max Use: 1",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 2,
              "excerpt": "6/28/2021 Correction LX LX Loop 200 LX_01 Correction made in PDF version / page 3 Loop ID 200 changed from / 99999 to 1.",
              "supports": [
                "loop_repeat"
              ]
            }
          ]
        },
        "0200:LX@130/LX01": {
          "key": {
            "segment": "LX",
            "position": "130",
            "loop": [
              "0200"
            ],
            "element": "LX01"
          },
          "usage": {
            "declared": "required",
            "declared_label": "M"
          },
          "evidence": [
            {
              "page": 17,
              "excerpt": "M LX01 554 Assigned Number M N0 1/6",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200/0205:AT7@140": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ]
          },
          "usage": {
            "declared": "required",
            "declared_label": "Mandatory"
          },
          "max_use": 1,
          "loop_repeat": 10,
          "conditions": [
            {
              "kind": "syntax",
              "text": "Only one of AT701 or AT703 may be present."
            },
            {
              "kind": "syntax",
              "text": "If either AT701 or AT702 is present, then the other is required."
            },
            {
              "kind": "syntax",
              "text": "If either AT703 or AT704 is present, then the other is required."
            },
            {
              "kind": "syntax",
              "text": "AT705 is required."
            },
            {
              "kind": "syntax",
              "text": "If AT706 is present then AT707 is required."
            },
            {
              "kind": "semantic",
              "text": "If AT701 is present, AT705 is the date the status occurred. If AT703 is present, AT705 is a date related to an appointment."
            },
            {
              "kind": "semantic",
              "text": "If AT701 is present, AT706 is the time of the status. If AT703 is present, AT706 is the time of the appointment."
            },
            {
              "kind": "semantic",
              "text": "An AT701 or AT703 is required."
            },
            {
              "kind": "semantic",
              "text": "LT is the only allowable Time Code for AT707. All times must be sent in the time zone of the reported location."
            },
            {
              "kind": "semantic",
              "text": "KBX will use the code ‘ZZ’ in the AT701 for En Route to Pick-Up Reporting"
            },
            {
              "kind": "semantic",
              "text": "XB should be used to indicate a carrier’s Estimated Arrival to the Origin Stop"
            }
          ],
          "evidence": [
            {
              "page": 6,
              "excerpt": "LOOP ID – 0205 10 / 24 140 AT7 Shipment Status Details M 1",
              "supports": [
                "usage",
                "max_use",
                "loop_repeat"
              ]
            },
            {
              "page": 18,
              "excerpt": "Segment: AT7 Shipment Status Details Position: 140 Loop: 0205 Mandatory Level: Usage: Mandatory Max Use: 1",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 18,
              "excerpt": "Syntax Notes: 1 Only one of AT701 or AT703 may be present. / 2 If either AT701 or AT702 is present, then the other is required. / 3 If either AT703 or AT704 is present, then the other is required. / 4 AT705 is required. / 5 If AT706 is present then AT707 is required.",
              "supports": [
                "conditions"
              ]
            },
            {
              "page": 18,
              "excerpt": "Semantic Notes: 1 If AT701 is present, AT705 is the date the status occurred. If AT703 is present, AT705 is a date related / to an appointment. / 2 If AT701 is present, AT706 is the time of the status. If AT703 is present, AT706 is the time of the / appointment.",
              "supports": [
                "conditions"
              ]
            },
            {
              "page": 18,
              "excerpt": "Notes: 1 An AT701 or AT703 is required. / 2 LT is the only allowable Time Code for AT707. All times must be sent in the time zone of the reported / location. / 3 KBX will use the code ‘ZZ’ in the AT701 for En Route to Pick-Up Reporting / 4 XB should be used to indicate a carrier’s Estimated Arrival to the Origin Stop",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT701": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT701"
          },
          "usage": {
            "declared": "conditional",
            "declared_label": "X"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "AF",
              "AG",
              "AR",
              "CD",
              "K1",
              "P1",
              "PR",
              "RA",
              "RD",
              "RL",
              "XB",
              "X1",
              "X3",
              "X4",
              "X6",
              "ZZ"
            ]
          },
          "conditions": [
            {
              "kind": "timing",
              "text": "Please send the Shipment Status Code as soon as you can. Preference would be not to hold the status up for a late reason code."
            },
            {
              "kind": "context",
              "text": "Truckload: XB, X3, AF, AG, X1 and CD are required (R); X6 is conditional (C*), required unless communicating in-transit through another means (API, P44, Tops2Go); ZZ, PR and K1 are optional (O)."
            },
            {
              "kind": "timing",
              "text": "Send actuals within 1 hour of the event."
            },
            {
              "kind": "timing",
              "text": "Send trailer / load location updates every 15 minutes."
            },
            {
              "kind": "semantic",
              "text": "XB Shipment Acknowledged should be used for Estimated Arrival to Origin Stop."
            }
          ],
          "evidence": [
            {
              "page": 18,
              "excerpt": "AT701 1650 Shipment Status Code X ID 2/2",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 18,
              "excerpt": "AF Carrier Departed Pick-up Location with Shipment / ZZ En Route to Pick-up Location",
              "supports": [
                "codes"
              ]
            },
            {
              "page": 18,
              "excerpt": "Please send the Shipment Status Code as soon as you can. Preference would / be not to hold the status up for a late reason code.",
              "supports": [
                "conditions"
              ]
            },
            {
              "page": 5,
              "excerpt": "Sending AT7_01 and AT7_03 Status or Appointment Codes / XB X X R / ZZ X X O / X3 X X X R / AF depart the Pick-up stop with X X X R / X6 depart the shipper location X X X C* / *Conditional- Required unless communicating in-transit through / another means (API, P44, Tops2Go) / AG X X X R / PR at Bonded X O / K1 Load has arrived at Customs. X O / X1 prepared to have the X X X R / CD X X X R / Send actuals within 1 hour of the event. / Send trailer / load location updates every 15 minutes until the",
              "supports": [
                "conditions"
              ]
            },
            {
              "page": 3,
              "excerpt": "XB Shipment Acknowledged should be used for Estimated Arrival to Origin Stop.",
              "supports": [
                "conditions"
              ]
            }
          ],
          "review": {
            "reason": "The truckload requirement per status code is read from the table on page 5, whose columns are only aligned by position."
          }
        },
        "0200/0205:AT7@140/AT702": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT702"
          },
          "usage": {
            "declared": "conditional",
            "declared_label": "X"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "A1",
              "A2",
              "A3",
              "A5",
              "A6",
              "AA",
              "AD",
              "AF",
              "AG",
              "AH",
              "AI",
              "AJ",
              "AK",
              "AL",
              "AM",
              "AN",
              "AO",
              "AP",
              "AQ",
              "AR",
              "AS",
              "AT",
              "AU",
              "AV",
              "AW",
              "AX",
              "AY",
              "B1",
              "B2",
              "B5",
              "B8",
              "B9",
              "BB",
              "BC",
              "BD",
              "BE",
              "BF",
              "BG",
              "BH",
              "BI",
              "BJ",
              "BK",
              "BL",
              "BM",
              "BN",
              "BO",
              "BP",
              "BQ",
              "BR",
              "BS",
              "BT",
              "C1",
              "C4",
              "C5",
              "C6",
              "C7",
              "C8",
              "CA",
              "CB",
              "CC",
              "D1",
              "D2",
              "HB",
              "NA",
              "NS",
              "P1",
              "P2",
              "P4",
              "RC",
              "S1",
              "T2",
              "T3",
              "T4",
              "T7"
            ]
          },
          "conditions": [
            {
              "kind": "timing",
              "text": "Please send the Shipment Status Code as soon as you can. Preference would be not to hold the status up for a late reason code."
            },
            {
              "kind": "semantic",
              "text": "Use codes pertaining to Shipment Status Reporting."
            },
            {
              "kind": "semantic",
              "text": "‘NA’ is NOT VALID for Status Reporting."
            },
            {
              "kind": "semantic",
              "text": "‘NS’ should be used for Normal Status."
            }
          ],
          "evidence": [
            {
              "page": 19,
              "excerpt": "AT702 1651 Shipment Status or Appointment Reason Code X ID 2/2",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 19,
              "excerpt": "Please send the Shipment Status Code as soon as you can. Preference would / be not to hold the status up for a late reason code. / Use codes pertaining to Shipment Status Reporting. / ‘NA’ is NOT VALID for Status Reporting. / ‘NS’ should be used for Normal Status.",
              "supports": [
                "conditions"
              ]
            },
            {
              "page": 19,
              "excerpt": "A1 Missed Delivery / BM Flatcar Shortage",
              "supports": [
                "codes"
              ]
            },
            {
              "page": 20,
              "excerpt": "BN Failed to Release Billing / NA Normal Appointment (Only for use in AT7_04) / NS Normal Status (Only for use in AT7-02) / T7 Insufficient Delivery Time",
              "supports": [
                "codes"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT703": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT703"
          },
          "usage": {
            "declared": "conditional",
            "declared_label": "X"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "AA",
              "AB"
            ]
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "AA Pick-up Appointment Date and/or Time (No longer should be used as an Estimated Arrival to Shipper)"
            },
            {
              "kind": "context",
              "text": "Truckload: AB is required (R); AA is conditional (*C), only required if the shipper goes by Appointment."
            },
            {
              "kind": "semantic",
              "text": "AA should not be used for Estimated Arrival to Origin. Only use AA for communicating Origin Appointments."
            }
          ],
          "evidence": [
            {
              "page": 20,
              "excerpt": "AT703 1652 Shipment Appointment Status Code X ID 2/2",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 20,
              "excerpt": "AA Pick-up Appointment Date and/or Time (No longer / should be used as an Estimated Arrival to Shipper) / AB Delivery Appointment Date and/or Time",
              "supports": [
                "codes",
                "conditions"
              ]
            },
            {
              "page": 5,
              "excerpt": "*Conditional- Only required if the shipper goes by Appointment. / AA appointment at a Pick-up X X *C -If no Appointment it is not Required. / AB appointment at a delivery X X X R",
              "supports": [
                "conditions"
              ]
            },
            {
              "page": 3,
              "excerpt": "AA should not be used for Estimated Arrival to Origin. Only use AA for communicating Origin / Appointments.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT704": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT704"
          },
          "usage": {
            "declared": "conditional",
            "declared_label": "X"
          },
          "codes": {
            "mode": "reference",
            "ref": "AT702"
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "Use codes as found in the AT702 data element list pertaining to Appointment Status Reporting."
            },
            {
              "kind": "semantic",
              "text": "‘NS’ is NOT VALID for Appointment Reporting."
            },
            {
              "kind": "semantic",
              "text": "‘NA’ should be used for Normal Appointments."
            }
          ],
          "evidence": [
            {
              "page": 20,
              "excerpt": "AT704 1651 Shipment Status or Appointment Reason Code X ID 2/2",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 20,
              "excerpt": "Use codes as found in the AT702 data element list pertaining to / Appointment Status Reporting. / ‘NS’ is NOT VALID for Appointment Reporting. / ‘NA’ should be used for Normal Appointments. / *All other reason codes from the AT7_02 list above may be used.",
              "supports": [
                "codes",
                "conditions"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT705": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT705"
          },
          "usage": {
            "declared": "required",
            "declared_label": "M"
          },
          "evidence": [
            {
              "page": 20,
              "excerpt": "M AT705 373 Date M DT 8/8",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT706": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT706"
          },
          "usage": {
            "declared": "conditional",
            "declared_label": "X"
          },
          "evidence": [
            {
              "page": 20,
              "excerpt": "AT706 337 Time X TM 4/8",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT707": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT707"
          },
          "usage": {
            "declared": "conditional",
            "declared_label": "X"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "LT"
            ]
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "AT7_07 should always contain ‘LT’ for ‘Local Time’ of the appropriate time zone location of the event."
            }
          ],
          "evidence": [
            {
              "page": 20,
              "excerpt": "AT707 623 Time Code X ID 2/2 / Code identifying the time zone. / LT Local Time",
              "supports": [
                "usage",
                "codes"
              ]
            },
            {
              "page": 3,
              "excerpt": "AT7_07 should always contain ‘LT’ for ‘Local Time’ of the appropriate time zone location of the",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200/0205:MS1@143": {
          "key": {
            "segment": "MS1",
            "position": "143",
            "loop": [
              "0200",
              "0205"
            ]
          },
          "usage": {
            "declared": "required",
            "declared_label": "Mandatory"
          },
          "max_use": 1,
          "conditions": [
            {
              "kind": "syntax",
              "text": "If MS101 is present, then MS102 is required."
            },
            {
              "kind": "syntax",
              "text": "If MS101 and MS102 are present then MS103 is required if the country is not US."
            },
            {
              "kind": "syntax",
              "text": "Only one MS101 or MS104 may be present."
            },
            {
              "kind": "syntax",
              "text": "If MS102 is present, then MS101 is required."
            },
            {
              "kind": "syntax",
              "text": "If MS103 is present, then MS101 is required."
            },
            {
              "kind": "syntax",
              "text": "If either MS104 or MS105 is present, then the other is required"
            },
            {
              "kind": "syntax",
              "text": "If MS104 and MS105 are present than MS101, MS102 and MS103 should not be present."
            },
            {
              "kind": "syntax",
              "text": "If MS104 is present with longitude specified in degrees minutes and seconds format, then MS106 is required."
            },
            {
              "kind": "syntax",
              "text": "If MS105 is present with latitude specified in degrees minutes and seconds format, then MS107 is required."
            },
            {
              "kind": "syntax",
              "text": "If MS106 is present, then MS104 is required."
            },
            {
              "kind": "syntax",
              "text": "If MS107 is present, then MS105 is required."
            },
            {
              "kind": "semantic",
              "text": "The location information must be the last known equipment location for the Shipment Status Codes (AT701) indicating that a shipment status event has already occurred (IE. AF, X6, X1) and must indicate the intended equipment position for Shipment Status codes (AT701) indicating a future estimated or planned activity (IE. AG, XB)."
            },
            {
              "kind": "semantic",
              "text": "The location information must be the location for which the Shipment Appointment Status Code (AT703) is being reported."
            },
            {
              "kind": "semantic",
              "text": "Decimal format is no longer an option for sending MS1_04 and MS1_05"
            },
            {
              "kind": "semantic",
              "text": "The location information can be reported in any of the following formats listed in order of preference: a. Longitude/Latitude in degree/minute/second format; b. City/State/Country"
            }
          ],
          "evidence": [
            {
              "page": 6,
              "excerpt": "28 143 MS1 Equipment, Shipment, or Real Property Location M 1",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 21,
              "excerpt": "Segment: MS1 Equipment, Shipment, or Real Property Location Position: 143 Loop: 0205 Mandatory Level: Usage: Mandatory Max Use: 1",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 21,
              "excerpt": "Syntax Notes: 1 If MS101 is present, then MS102 is required. / 2 If MS101 and MS102 are present then MS103 is required if the country is not US. / 3 Only one MS101 or MS104 may be present. / 4 If MS102 is present, then MS101 is required. / 5 If MS103 is present, then MS101 is required. / 6 If either MS104 or MS105 is present, then the other is required / 7 If MS104 and MS105 are present than MS101, MS102 and MS103 should not be present. / 8 If MS104 is present with longitude specified in degrees minutes and seconds format, then MS106 is / 9 If MS105 is present with latitude specified in degrees minutes and seconds format, then MS107 is / 10 If MS106 is present, then MS104 is required. / 11 If MS107 is present, then MS105 is required.",
              "supports": [
                "conditions"
              ]
            },
            {
              "page": 21,
              "excerpt": "Notes: 1 The location information must be the last known equipment location for the Shipment Status Codes / (AT701) indicating that a shipment status event has already occurred (IE. AF, X6, X1) and must indicate the intended equipment / position for Shipment Status codes (AT701) indicating a future estimated or planned activity (IE. AG, XB). / 2 The location information must be the location for which the Shipment Appointment Status Code / 3 Decimal format is no longer an option for sending MS1_04 and MS1_05 / 4 The location information can be reported in any of the following formats listed in order of preference / a. Longitude/Latitude in degree/minute/second format / b. City/State/Country",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200/0205:MS1@143/MS101": {
          "key": {
            "segment": "MS1",
            "position": "143",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS101"
          },
          "usage": {
            "declared": "conditional",
            "declared_label": "X"
          },
          "evidence": [
            {
              "page": 21,
              "excerpt": "MS101 19 City Name X AN 2/30",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200/0205:MS1@143/MS102": {
          "key": {
            "segment": "MS1",
            "position": "143",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS102"
          },
          "usage": {
            "declared": "conditional",
            "declared_label": "X"
          },
          "codes": {
            "mode": "unspecified"
          },
          "evidence": [
            {
              "page": 21,
              "excerpt": "MS102 156 State or Province Code X ID 2/2",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "0200/0205:MS1@143/MS103": {
          "key": {
            "segment": "MS1",
            "position": "143",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS103"
          },
          "usage": {
            "declared": "conditional",
            "declared_label": "X"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "CA",
              "CAN",
              "MX",
              "MEX",
              "US",
              "USA"
            ]
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "Mandatory if not US and MS101 and MS102 are present."
            }
          ],
          "evidence": [
            {
              "page": 21,
              "excerpt": "MS103 26 Country Code X ID 2/3",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 21,
              "excerpt": "Mandatory if not US and MS101 and MS102 are present.",
              "supports": [
                "conditions"
              ]
            },
            {
              "page": 21,
              "excerpt": "CA CANADA CAN CANADA MX MEXICO MEX MEXICO US UNITED STATES OF AMERICA USA UNITED STATES OF AMERICA",
              "supports": [
                "codes"
              ]
            }
          ]
        },
        "0200/0205:MS1@143/MS104": {
          "key": {
            "segment": "MS1",
            "position": "143",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS104"
          },
          "usage": {
            "declared": "conditional",
            "declared_label": "X"
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "All values must specify leading and trailing zeroes."
            },
            {
              "kind": "semantic",
              "text": "When this format is used the geographic direction must be specified in MS106."
            }
          ],
          "evidence": [
            {
              "page": 21,
              "excerpt": "MS104 1654 Longitude Code X R 4/9",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 21,
              "excerpt": "positions), minutes (2 positions) and seconds (2 positions). All values must / specify leading and trailing zeroes.",
              "supports": [
                "conditions"
              ]
            },
            {
              "page": 22,
              "excerpt": "format is used the geographic direction must be specified in MS106.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200/0205:MS1@143/MS105": {
          "key": {
            "segment": "MS1",
            "position": "143",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS105"
          },
          "usage": {
            "declared": "conditional",
            "declared_label": "X"
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "All values must specify leading and trailing zeroes."
            },
            {
              "kind": "semantic",
              "text": "When this format is used the geographic direction must be specified in MS107."
            }
          ],
          "evidence": [
            {
              "page": 22,
              "excerpt": "MS105 1655 Latitude Code X R 4/9",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 22,
              "excerpt": "specify leading and trailing zeroes. / format is used the geographic direction must be specified in MS107.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200/0205:MS1@143/MS106": {
          "key": {
            "segment": "MS1",
            "position": "143",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS106"
          },
          "usage": {
            "declared": "conditional",
            "declared_label": "X"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "E",
              "W"
            ]
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "Mandatory if MS104 Longitude was specified in Degree Minute Second format."
            }
          ],
          "evidence": [
            {
              "page": 22,
              "excerpt": "MS106 1280 Direction Identifier Code X ID 1/1",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 22,
              "excerpt": "Mandatory if MS104 Longitude was specified in Degree Minute Second / format.",
              "supports": [
                "conditions"
              ]
            },
            {
              "page": 22,
              "excerpt": "E East / W West",
              "supports": [
                "codes"
              ]
            }
          ]
        },
        "0200/0205:MS1@143/MS107": {
          "key": {
            "segment": "MS1",
            "position": "143",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS107"
          },
          "usage": {
            "declared": "conditional",
            "declared_label": "X"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "N",
              "S"
            ]
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "Mandatory if MS105 Latitude was specified in Degree Minute Second format."
            }
          ],
          "evidence": [
            {
              "page": 22,
              "excerpt": "MS107 1280 Direction Identifier Code X ID 1/1",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 22,
              "excerpt": "Mandatory if MS105 Latitude was specified in Degree Minute Second format.",
              "supports": [
                "conditions"
              ]
            },
            {
              "page": 22,
              "excerpt": "N North / S South",
              "supports": [
                "codes"
              ]
            }
          ]
        },
        "0200/0205:MS2@146": {
          "key": {
            "segment": "MS2",
            "position": "146",
            "loop": [
              "0200",
              "0205"
            ]
          },
          "usage": {
            "declared": "conditional",
            "declared_label": "Mandatory except for reporting Appointment Status Codes (AT703)"
          },
          "max_use": 1,
          "conditions": [
            {
              "kind": "semantic",
              "text": "MS202 is optional for instances when the Equipment number in not known."
            },
            {
              "kind": "context",
              "text": "The MS2 segment is not required for any status sent prior to Actual Depart Shipper (AT701= AF)."
            },
            {
              "kind": "context",
              "text": "AF must include the MS2 segment and must include the actual Equipment Number that the load is being moved with."
            },
            {
              "kind": "context",
              "text": "All statuses sent after the Actual Depart from Shipper should have an MS2 segment with the actual Equipment number."
            }
          ],
          "evidence": [
            {
              "page": 6,
              "excerpt": "31 146 MS2 Equipment or Container Owner and Type M 1",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 23,
              "excerpt": "Segment: MS2 Equipment or Container Owner and Type Position: 146 Loop: 0205 Mandatory Level: Usage: Mandatory except for reporting Appointment Status Codes (AT703) Max Use: 1",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 23,
              "excerpt": "2 MS202 is optional for instances when the Equipment number in not known. / Notes: The MS2 segment is not required for any status sent prior to Actual Depart Shipper / (AT701= AF). AF must include the MS2 segment and must include the actual / Equipment Number that the load is being moved with. All statuses sent after the / Actual Depart from Shipper should have an MS2 segment with the actual / Equipment number.",
              "supports": [
                "conditions"
              ]
            }
          ],
          "review": {
            "reason": "The usage field exempts only appointment statuses, while the notes also exempt every status sent before AF."
          }
        },
        "0200/0205:MS2@146/MS201": {
          "key": {
            "segment": "MS2",
            "position": "146",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS201"
          },
          "usage": {
            "declared": "required",
            "declared_label": "M"
          },
          "codes": {
            "mode": "unspecified"
          },
          "evidence": [
            {
              "page": 23,
              "excerpt": "M MS201 140 Standard Carrier Alpha Code M ID 2/4",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "0200/0205:MS2@146/MS202": {
          "key": {
            "segment": "MS2",
            "position": "146",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS202"
          },
          "usage": {
            "declared": "optional",
            "declared_label": "O"
          },
          "evidence": [
            {
              "page": 23,
              "excerpt": "MS202 207 Equipment Number O AN 1/10",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200/0205:MS2@146/MS203": {
          "key": {
            "segment": "MS2",
            "position": "146",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS203"
          },
          "usage": {
            "declared": "optional",
            "declared_label": "O"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "AF",
              "BO",
              "BR",
              "BX",
              "CH",
              "CN",
              "DD",
              "FT",
              "HV",
              "LU",
              "OV",
              "RA",
              "RD",
              "RS",
              "RT",
              "SD",
              "ST",
              "TA",
              "TF",
              "TG",
              "TI",
              "TJ",
              "TK",
              "TL",
              "TM",
              "TP",
              "TQ",
              "TV",
              "TW",
              "VE"
            ]
          },
          "evidence": [
            {
              "page": 23,
              "excerpt": "MS203 40 Equipment Description Code O ID 2/2",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 23,
              "excerpt": "AF AIR FREIGHT / TV TRUCK, VAN",
              "supports": [
                "codes"
              ]
            },
            {
              "page": 24,
              "excerpt": "TW TRAILER, REFRIGERATED / VE VESSEL, OCEAN",
              "supports": [
                "codes"
              ]
            }
          ]
        },
        "0200:L11@150": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ]
          },
          "usage": {
            "declared": "conditional",
            "declared_label": "Mandatory except for reporting En Route (AT701 Shipment Status Code is ZZ or X6)"
          },
          "max_use": 300,
          "conditions": [
            {
              "kind": "syntax",
              "text": "If either L1101 or L1102 is present, then the other is required."
            },
            {
              "kind": "semantic",
              "text": "QN is mandatory unless carrier is reporting En Route Status Codes (ZZ or X6)"
            },
            {
              "kind": "semantic",
              "text": "PO is optional"
            },
            {
              "kind": "semantic",
              "text": "VN is mandatory"
            },
            {
              "kind": "semantic",
              "text": "When including the ‘VN’s and ‘PO’s for the stop ALL ‘VN’s and ‘PO’s reported on the load tender for the stop MUST be present."
            },
            {
              "kind": "context",
              "text": "The L11 segments for stop sequence (QN) are not required for reporting En Route (AT701 Shipment Status Code is ZZ or X6)"
            },
            {
              "kind": "semantic",
              "text": "Stop sequence numbering is ‘01, 02, 03, 04, etc.’"
            },
            {
              "kind": "semantic",
              "text": "The Stop Number must be the same as communicated on the EDI 204 segment S5 element S501."
            },
            {
              "kind": "semantic",
              "text": "The initial Pick-up Stop is 01."
            }
          ],
          "evidence": [
            {
              "page": 6,
              "excerpt": "33 150 L11 Business Instructions and Reference Number M 300",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 25,
              "excerpt": "Segment: L11 Business Instructions and Reference Number Position: 150 Loop: 0200 Mandatory Level: Usage: Mandatory except for reporting En Route (AT701 Shipment Status Code is ZZ or X6) Max Use: 300",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 25,
              "excerpt": "Syntax Notes: 1 If either L1101 or L1102 is present, then the other is required. / Semantic Notes: 1 QN is mandatory unless carrier is reporting En Route Status Codes (ZZ or X6) / 2 PO is optional / 3 VN is mandatory / Comments: When including the ‘VN’s and ‘PO’s for the stop ALL ‘VN’s and ‘PO’s reported on the load tender for the / stop MUST be present. / Notes: The L11 segments for stop sequence (QN) are not required for reporting En Route / (AT701 Shipment Status Code is ZZ or X6) / sequence numbering is ‘01, 02, 03, 04, etc.’ / is being reported. The Stop Number must be the same as communicated on the EDI 204 / segment S5 element S501. / NOTE: The initial Pick-up Stop is 01.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200:L11@150/L1101": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ],
            "element": "L1101"
          },
          "usage": {
            "declared": "required",
            "declared_label": "M"
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "2-digit QN Stop Sequence Number must be used"
            }
          ],
          "evidence": [
            {
              "page": 25,
              "excerpt": "M L1101 127 Reference Identification M AN 1/30",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 25,
              "excerpt": "2-digit QN Stop Sequence Number must be used",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200:L11@150/L1102": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ],
            "element": "L1102"
          },
          "usage": {
            "declared": "required",
            "declared_label": "M"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "PO",
              "QN",
              "VN"
            ]
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "PO Purchase Order Number (optional)"
            },
            {
              "kind": "semantic",
              "text": "QN Stop Sequence Number (Required on all statuses except X6 or ZZ)"
            },
            {
              "kind": "semantic",
              "text": "VN Vendor Number ‘Internal order#’ (Required)"
            }
          ],
          "evidence": [
            {
              "page": 25,
              "excerpt": "M L1102 128 Reference Identification Qualifier M ID 2/3",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 25,
              "excerpt": "PO Purchase Order Number (optional) / QN Stop Sequence Number (Required on all statuses except / X6 or ZZ) / VN Vendor Number ‘Internal order#’ (Required)",
              "supports": [
                "codes",
                "conditions"
              ]
            }
          ]
        },
        "0200:K1@170": {
          "key": {
            "segment": "K1",
            "position": "170",
            "loop": [
              "0200"
            ]
          },
          "usage": {
            "declared": "optional",
            "declared_label": "Optional"
          },
          "max_use": 10,
          "evidence": [
            {
              "page": 6,
              "excerpt": "34 170 K1 Remarks O 10",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 26,
              "excerpt": "Segment: K1 Remarks Position: 170 Loop: 0200 Mandatory Level: Usage: Optional Max Use: 10",
              "supports": [
                "usage",
                "max_use"
              ]
            }
          ]
        },
        "0200:K1@170/K101": {
          "key": {
            "segment": "K1",
            "position": "170",
            "loop": [
              "0200"
            ],
            "element": "K101"
          },
          "usage": {
            "declared": "required",
            "declared_label": "M"
          },
          "evidence": [
            {
              "page": 26,
              "excerpt": "M K101 61 Free-Form Message M AN 1/30",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200:K1@170/K102": {
          "key": {
            "segment": "K1",
            "position": "170",
            "loop": [
              "0200"
            ],
            "element": "K102"
          },
          "usage": {
            "declared": "optional",
            "declared_label": "O"
          },
          "evidence": [
            {
              "page": 26,
              "excerpt": "K102 61 Free-Form Message O AN 1/30",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200:AT8@200": {
          "key": {
            "segment": "AT8",
            "position": "200",
            "loop": [
              "0200"
            ]
          },
          "usage": {
            "declared": "required",
            "declared_label": "Mandatory"
          },
          "max_use": 10,
          "conditions": [
            {
              "kind": "syntax",
              "text": "AT801, AT802, AT803, AT804 are required."
            }
          ],
          "evidence": [
            {
              "page": 6,
              "excerpt": "35 200 AT8 Shipment Weight, Packaging and Quantity Data M 10",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 27,
              "excerpt": "Segment: AT8 Shipment Weight, Packaging and Quantity Data Position: 200 Loop: 0200 Mandatory Level: Usage: Mandatory Max Use: 10",
              "supports": [
                "usage",
                "max_use"
              ]
            },
            {
              "page": 27,
              "excerpt": "Syntax Notes: 1 AT801, AT802, AT803, AT804 are required.",
              "supports": [
                "conditions"
              ]
            }
          ]
        },
        "0200:AT8@200/AT801": {
          "key": {
            "segment": "AT8",
            "position": "200",
            "loop": [
              "0200"
            ],
            "element": "AT801"
          },
          "usage": {
            "declared": "required",
            "declared_label": "M"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "G"
            ]
          },
          "evidence": [
            {
              "page": 27,
              "excerpt": "M AT801 187 Weight Qualifier M ID 1/2 / G Gross Weight",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "0200:AT8@200/AT802": {
          "key": {
            "segment": "AT8",
            "position": "200",
            "loop": [
              "0200"
            ],
            "element": "AT802"
          },
          "usage": {
            "declared": "required",
            "declared_label": "M"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "K",
              "L"
            ]
          },
          "evidence": [
            {
              "page": 27,
              "excerpt": "M AT802 188 Weight Unit Code M ID 1/1 / K Kilograms / L Pounds",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "0200:AT8@200/AT803": {
          "key": {
            "segment": "AT8",
            "position": "200",
            "loop": [
              "0200"
            ],
            "element": "AT803"
          },
          "usage": {
            "declared": "required",
            "declared_label": "M"
          },
          "evidence": [
            {
              "page": 27,
              "excerpt": "M AT803 81 Weight M R 1/10",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200:AT8@200/AT804": {
          "key": {
            "segment": "AT8",
            "position": "200",
            "loop": [
              "0200"
            ],
            "element": "AT804"
          },
          "usage": {
            "declared": "required",
            "declared_label": "M"
          },
          "evidence": [
            {
              "page": 27,
              "excerpt": "M AT804 80 Lading Quantity M N0 1/7",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200:AT8@200/AT805": {
          "key": {
            "segment": "AT8",
            "position": "200",
            "loop": [
              "0200"
            ],
            "element": "AT805"
          },
          "usage": {
            "declared": "optional",
            "declared_label": "O"
          },
          "evidence": [
            {
              "page": 27,
              "excerpt": "AT805 80 Lading Quantity O N0 1/7",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200:AT8@200/AT806": {
          "key": {
            "segment": "AT8",
            "position": "200",
            "loop": [
              "0200"
            ],
            "element": "AT806"
          },
          "usage": {
            "declared": "conditional",
            "declared_label": "X"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "E"
            ]
          },
          "evidence": [
            {
              "page": 27,
              "excerpt": "AT806 184 Volume Unit Qualifier X ID 1/1 / E Cubic Feet",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "0200:AT8@200/AT807": {
          "key": {
            "segment": "AT8",
            "position": "200",
            "loop": [
              "0200"
            ],
            "element": "AT807"
          },
          "usage": {
            "declared": "conditional",
            "declared_label": "X"
          },
          "evidence": [
            {
              "page": 27,
              "excerpt": "AT807 183 Volume X R 1/8",
              "supports": [
                "usage"
              ]
            }
          ]
        }
      }
    },
    "domtar-214": {
      "guide": {
        "id": "domtar-214",
        "partner": "Domtar Industries",
        "partner_role": "shipper",
        "transaction_set": "214",
        "version": "004010",
        "modes": [
          "truckload",
          "ltl"
        ],
        "revision": "214SPECS_toolkit.DOC, cover dated March 12, 2002",
        "revision_date": "2008-09-24",
        "source": {
          "url": "https://www.iconnect-corp.com/specifications/vendors/Domtar/214SPECS_toolkit.pdf",
          "sha256": "098b98e96d796a67380f06788764749ed3e06a61d3122be83f6abf9527ac1691",
          "retrieved": "2026-10-19",
          "pages": 23
        }
      },
      "by_key": {
        "B10@020": {
          "key": {
            "segment": "B10",
            "position": "020"
          },
          "usage": {
            "declared": "required",
            "declared_label": "Mandatory"
          },
          "max_use": 1,
          "evidence": [
            {
              "page": 8,
              "excerpt": "020 B10 Beginning Segment for 1",
              "supports": [
                "max_use"
              ]
            },
            {
              "page": 12,
              "excerpt": "B10 Beginning Segment for Transportation Carrier Shipment Status",
              "supports": [
                "key"
              ]
            },
            {
              "page": 13,
              "excerpt": "Position: 020 Loop: Level: Usage: Mandatory Max Use: 1",
              "supports": [
                "usage",
                "max_use"
              ]
            }
          ]
        },
        "B10@020/B1001": {
          "key": {
            "segment": "B10",
            "position": "020",
            "element": "B1001"
          },
          "usage": {
            "declared": "unknown"
          },
          "evidence": [
            {
              "page": 13,
              "excerpt": "B1001 127 Reference Identification AN 1/30",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "B10@020/B1002": {
          "key": {
            "segment": "B10",
            "position": "020",
            "element": "B1002"
          },
          "usage": {
            "declared": "unknown"
          },
          "evidence": [
            {
              "page": 13,
              "excerpt": "B1002 145 Shipment Identification Number AN 1/30",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "B10@020/B1003": {
          "key": {
            "segment": "B10",
            "position": "020",
            "element": "B1003"
          },
          "usage": {
            "declared": "unknown"
          },
          "codes": {
            "mode": "unspecified"
          },
          "evidence": [
            {
              "page": 13,
              "excerpt": "B1003 140 Standard Carrier Alpha Code ID 2/4",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "L11@030": {
          "key": {
            "segment": "L11",
            "position": "030"
          },
          "usage": {
            "declared": "optional",
            "declared_label": "Optional"
          },
          "max_use": 300,
          "evidence": [
            {
              "page": 8,
              "excerpt": "030 L11 Business Instructions and 300",
              "supports": [
                "max_use"
              ]
            },
            {
              "page": 13,
              "excerpt": "L11 Business Instructions and Reference Number (BM/CMN) Position: 030 Loop: Level: Usage: Optional Max Use: 300",
              "supports": [
                "usage",
                "max_use"
              ]
            }
          ]
        },
        "L11@030/L1101": {
          "key": {
            "segment": "L11",
            "position": "030",
            "element": "L1101"
          },
          "usage": {
            "declared": "unknown"
          },
          "evidence": [
            {
              "page": 13,
              "excerpt": "L1101 127 Reference Identification AN 1/30",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "L11@030/L1102": {
          "key": {
            "segment": "L11",
            "position": "030",
            "element": "L1102"
          },
          "usage": {
            "declared": "unknown"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "BM",
              "CMN"
            ]
          },
          "evidence": [
            {
              "page": 13,
              "excerpt": "L1102 128 Reference Identification Qualifier ID 2/3 BM Bill of Lading Number CMN Continuous Move Number",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "0200:LX@130": {
          "key": {
            "segment": "LX",
            "position": "130",
            "loop": [
              "0200"
            ]
          },
          "usage": {
            "declared": "optional",
            "declared_label": "Optional"
          },
          "max_use": 1,
          "loop_repeat": 999999,
          "evidence": [
            {
              "page": 8,
              "excerpt": "LOOP ID - 0200 999999 / 130 LX Assigned Number 1",
              "supports": [
                "max_use",
                "loop_repeat"
              ]
            },
            {
              "page": 17,
              "excerpt": "LX Assigned Number Position: 130 Loop: 0200 Optional Level: Usage: Optional Max Use: 1",
              "supports": [
                "usage",
                "max_use"
              ]
            }
          ]
        },
        "0200:LX@130/LX01": {
          "key": {
            "segment": "LX",
            "position": "130",
            "loop": [
              "0200"
            ],
            "element": "LX01"
          },
          "usage": {
            "declared": "unknown"
          },
          "evidence": [
            {
              "page": 17,
              "excerpt": "LX01 554 Assigned Number N0 1/6",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200/0205:AT7@140": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ]
          },
          "usage": {
            "declared": "optional",
            "declared_label": "Optional"
          },
          "max_use": 1,
          "loop_repeat": 10,
          "conditions": [
            {
              "kind": "context",
              "text": "Truckload - Minimum of 5 statuses required (AA or EP/AB/AF/X1/D1 or S1)"
            }
          ],
          "evidence": [
            {
              "page": 8,
              "excerpt": "LOOP ID - 0205 10 / 140 AT7 Shipment Status Details 1",
              "supports": [
                "max_use",
                "loop_repeat"
              ]
            },
            {
              "page": 17,
              "excerpt": "AT7 Shipment Status Details Position: 140 Loop: 0205 Optional Level: Usage: Optional Max Use: 1 Notes: Truckload - Minimum of 5 statuses required (AA or EP/AB/AF/X1/D1 or S1)",
              "supports": [
                "usage",
                "max_use",
                "conditions"
              ]
            }
          ],
          "review": {
            "reason": "The usage field says Optional, while the segment note requires at least five truckload statuses. The LTL note on the same page is outside the truckload scope."
          }
        },
        "0200/0205:AT7@140/AT701": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT701"
          },
          "usage": {
            "declared": "unknown"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "A3",
              "A7",
              "A9",
              "AF",
              "AH",
              "AI",
              "AJ",
              "AM",
              "AP",
              "AR",
              "AV",
              "B6",
              "BA",
              "BC",
              "C1",
              "CA",
              "CD",
              "CP",
              "D1",
              "I1",
              "J1",
              "K1",
              "L1",
              "OA",
              "OO",
              "P1",
              "PR",
              "R1",
              "RL",
              "S1",
              "SD",
              "X1",
              "X2",
              "X3",
              "X4",
              "X5",
              "X6",
              "X8"
            ]
          },
          "evidence": [
            {
              "page": 17,
              "excerpt": "AT701 1650 Shipment Status Code ID 2/2",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 17,
              "excerpt": "A3 Shipment Returned to Shipper / CD Carrier Departed Delivery Location",
              "supports": [
                "codes"
              ]
            },
            {
              "page": 18,
              "excerpt": "CP Completed Loading at Pick-up Location / X8 Arrived at Pick-up Location Loading Dock",
              "supports": [
                "codes"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT702": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT702"
          },
          "usage": {
            "declared": "unknown"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "A1",
              "A2",
              "A3",
              "A5",
              "A6",
              "AA",
              "AD",
              "AF",
              "AH",
              "AI",
              "AK",
              "AL",
              "AM",
              "AN",
              "AO",
              "AP",
              "AQ",
              "AR",
              "AS",
              "AT",
              "AU",
              "AV",
              "AW",
              "AX",
              "AY",
              "AZ",
              "B1",
              "B2",
              "B5",
              "B8",
              "B9",
              "BB",
              "BC",
              "BD",
              "BE",
              "BF",
              "BH",
              "BI",
              "BJ",
              "BK",
              "BL",
              "BM",
              "BN",
              "BO",
              "BP",
              "BQ",
              "BR",
              "BS",
              "BT",
              "C1",
              "C5",
              "C6",
              "C7",
              "C8",
              "CA",
              "CB",
              "CC",
              "D1",
              "D2",
              "HB",
              "NA",
              "P1",
              "P2",
              "P4",
              "RC",
              "S1",
              "T2",
              "T3",
              "T4",
              "T7"
            ]
          },
          "evidence": [
            {
              "page": 18,
              "excerpt": "AT702 1651 Shipment Status or Appointment Reason Code ID 2/2",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 18,
              "excerpt": "A1 Missed Delivery / AZ Alternate Carrier Delivered",
              "supports": [
                "codes"
              ]
            },
            {
              "page": 19,
              "excerpt": "B1 Consignee Closed / T7 Insufficient Delivery Time",
              "supports": [
                "codes"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT703": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT703"
          },
          "usage": {
            "declared": "unknown"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "AA",
              "AB",
              "EP",
              "AC"
            ]
          },
          "evidence": [
            {
              "page": 20,
              "excerpt": "AT703 1652 Shipment Appointment Status Code ID 2/2",
              "supports": [
                "usage"
              ]
            },
            {
              "page": 20,
              "excerpt": "AA Pick-up Appointment Date and/or Time AB Delivery Appointment Date and/or Time EP Pick-up No Earlier Than Date and/or Time AC Estimated Delivery Appointment Date and/or Time",
              "supports": [
                "codes"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT704": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT704"
          },
          "usage": {
            "declared": "unknown"
          },
          "codes": {
            "mode": "reference",
            "ref": "AT702"
          },
          "evidence": [
            {
              "page": 20,
              "excerpt": "AT704 1651 Shipment Status or Appointment Reason Code ID 2/2 Same 70 codes as AT702",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT705": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT705"
          },
          "usage": {
            "declared": "unknown"
          },
          "evidence": [
            {
              "page": 20,
              "excerpt": "AT705 373 Date DT 8/8",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT706": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT706"
          },
          "usage": {
            "declared": "unknown"
          },
          "evidence": [
            {
              "page": 20,
              "excerpt": "AT706 337 Time TM 4/8",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200/0205:AT7@140/AT707": {
          "key": {
            "segment": "AT7",
            "position": "140",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "AT707"
          },
          "usage": {
            "declared": "unknown"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "CT",
              "ET",
              "MT",
              "PT"
            ]
          },
          "evidence": [
            {
              "page": 20,
              "excerpt": "AT707 623 Time Code ID 2/2 CT Central Time ET Eastern Time MT Mountain Time PT Pacific Time",
              "supports": [
                "usage",
                "codes"
              ]
            },
            {
              "page": 9,
              "excerpt": "AT7***AB**19980130*0802*LT",
              "supports": [
                "codes"
              ]
            }
          ],
          "review": {
            "reason": "The transaction examples send LT in AT707, which the AT707 code list does not include."
          }
        },
        "0200/0205:MS1@143": {
          "key": {
            "segment": "MS1",
            "position": "143",
            "loop": [
              "0200",
              "0205"
            ]
          },
          "usage": {
            "declared": "optional",
            "declared_label": "Optional"
          },
          "max_use": 1,
          "evidence": [
            {
              "page": 8,
              "excerpt": "143 MS1 Equipment, Shipment, or Real 1",
              "supports": [
                "max_use"
              ]
            },
            {
              "page": 20,
              "excerpt": "MS1 Equipment, Shipment, or Real Property Location Position: 143 Loop: 0205 Optional Level: Usage: Optional Max Use: 1",
              "supports": [
                "usage",
                "max_use"
              ]
            }
          ]
        },
        "0200/0205:MS1@143/MS101": {
          "key": {
            "segment": "MS1",
            "position": "143",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS101"
          },
          "usage": {
            "declared": "unknown"
          },
          "evidence": [
            {
              "page": 20,
              "excerpt": "MS101 19 City Name AN 2/30",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200/0205:MS1@143/MS102": {
          "key": {
            "segment": "MS1",
            "position": "143",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS102"
          },
          "usage": {
            "declared": "unknown"
          },
          "codes": {
            "mode": "unspecified"
          },
          "evidence": [
            {
              "page": 20,
              "excerpt": "MS102 156 State or Province Code ID 2/2",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "0200/0205:MS1@143/MS103": {
          "key": {
            "segment": "MS1",
            "position": "143",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS103"
          },
          "usage": {
            "declared": "unknown"
          },
          "codes": {
            "mode": "unspecified"
          },
          "conditions": [
            {
              "kind": "semantic",
              "text": "Shown if not U.S."
            }
          ],
          "evidence": [
            {
              "page": 20,
              "excerpt": "MS103 26 Country Code ID 2/3 Shown if not U.S.",
              "supports": [
                "usage",
                "codes",
                "conditions"
              ]
            }
          ]
        },
        "0200/0205:MS2@146": {
          "key": {
            "segment": "MS2",
            "position": "146",
            "loop": [
              "0200",
              "0205"
            ]
          },
          "usage": {
            "declared": "optional",
            "declared_label": "Optional"
          },
          "max_use": 1,
          "evidence": [
            {
              "page": 8,
              "excerpt": "146 MS2 Equipment or Container Owner 1",
              "supports": [
                "max_use"
              ]
            },
            {
              "page": 20,
              "excerpt": "MS2 Equipment or Container Owner and Type Position: 146 Loop: 0205 Optional Level: Usage: Optional Max Use: 1",
              "supports": [
                "usage",
                "max_use"
              ]
            }
          ]
        },
        "0200/0205:MS2@146/MS201": {
          "key": {
            "segment": "MS2",
            "position": "146",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS201"
          },
          "usage": {
            "declared": "unknown"
          },
          "codes": {
            "mode": "unspecified"
          },
          "evidence": [
            {
              "page": 20,
              "excerpt": "MS201 140 Standard Carrier Alpha Code ID 2/4",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "0200/0205:MS2@146/MS202": {
          "key": {
            "segment": "MS2",
            "position": "146",
            "loop": [
              "0200",
              "0205"
            ],
            "element": "MS202"
          },
          "usage": {
            "declared": "unknown"
          },
          "evidence": [
            {
              "page": 21,
              "excerpt": "MS202 207 Equipment Number AN 1/10",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200:L11@150": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ]
          },
          "usage": {
            "declared": "optional",
            "declared_label": "Optional"
          },
          "max_use": 10,
          "evidence": [
            {
              "page": 8,
              "excerpt": "150 L11 Business Instructions and 10",
              "supports": [
                "max_use"
              ]
            },
            {
              "page": 22,
              "excerpt": "L11 Business Instructions and Reference Number (QN/VN) Position: 150 Loop: 0200 Optional Level: Usage: Optional Max Use: 10",
              "supports": [
                "usage",
                "max_use"
              ]
            }
          ]
        },
        "0200:L11@150/L1101": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ],
            "element": "L1101"
          },
          "usage": {
            "declared": "unknown"
          },
          "evidence": [
            {
              "page": 22,
              "excerpt": "L1101 127 Reference Identification AN 1/30",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200:L11@150/L1102": {
          "key": {
            "segment": "L11",
            "position": "150",
            "loop": [
              "0200"
            ],
            "element": "L1102"
          },
          "usage": {
            "declared": "unknown"
          },
          "codes": {
            "mode": "enumerated",
            "values": [
              "QN",
              "VN"
            ]
          },
          "evidence": [
            {
              "page": 22,
              "excerpt": "L1102 128 Reference Identification Qualifier ID 2/3 QN Stop Sequence Number VN Vendor Order Number (DII’s internal order number)",
              "supports": [
                "usage",
                "codes"
              ]
            }
          ]
        },
        "0200:K1@170": {
          "key": {
            "segment": "K1",
            "position": "170",
            "loop": [
              "0200"
            ]
          },
          "usage": {
            "declared": "optional",
            "declared_label": "Optional"
          },
          "max_use": 10,
          "evidence": [
            {
              "page": 8,
              "excerpt": "170 K1 Remarks 10",
              "supports": [
                "max_use"
              ]
            },
            {
              "page": 22,
              "excerpt": "K1 Remarks Position: 170 Loop: 0200 Optional Level: Usage: Optional Max Use: 10",
              "supports": [
                "usage",
                "max_use"
              ]
            }
          ]
        },
        "0200:K1@170/K101": {
          "key": {
            "segment": "K1",
            "position": "170",
            "loop": [
              "0200"
            ],
            "element": "K101"
          },
          "usage": {
            "declared": "unknown"
          },
          "evidence": [
            {
              "page": 22,
              "excerpt": "K101 61 Free-Form Message AN 1/30",
              "supports": [
                "usage"
              ]
            }
          ]
        },
        "0200:K1@170/K102": {
          "key": {
            "segment": "K1",
            "position": "170",
            "loop": [
              "0200"
            ],
            "element": "K102"
          },
          "usage": {
            "declared": "unknown"
          },
          "evidence": [
            {
              "page": 22,
              "excerpt": "K102 61 Free-Form Message AN 1/30",
              "supports": [
                "usage"
              ]
            }
          ]
        }
      }
    }
  },
  "headers": [
    "unit",
    "left_guide",
    "right_guide",
    "left_key",
    "right_key",
    "alignment",
    "category",
    "verdict",
    "left",
    "right",
    "detail",
    "left_pages",
    "right_pages",
    "label",
    "note"
  ],
  "rows": [
    {
      "unit": "F001",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "B10@020",
      "right_key": "B10@020",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "required (\"Used\")",
      "right": "required (\"Mandatory\")",
      "left_pages": "3,11",
      "right_pages": "6,11",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F002",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "B10@020",
      "right_key": "B10@020",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "same",
      "left": "max use 1",
      "right": "max use 1",
      "left_pages": "3,11",
      "right_pages": "6,11",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F003",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "B10@020",
      "right_key": "B10@020",
      "alignment": "exact",
      "category": "condition",
      "verdict": "review",
      "left": "[syntax] E0105 - Only one of B1001 or B1005 may be present. | [syntax] P0506 - If either B1005 or B1006 is present, then the other is required. | [syntax] R0106 - At least one of B1001 or B1006 is required.",
      "right": "[syntax] B1001 is required. | [syntax] B1002 is required when used in Transaction Set 214. | [syntax] B1003 is required when used in Transaction Set 214.",
      "detail": "3 vs 3 conditions in free text",
      "left_pages": "3,11",
      "right_pages": "6,11",
      "label": "",
      "note": ""
    },
    {
      "unit": "F004",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "B10@020/B1001",
      "right_key": "B10@020/B1001",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "required (\"Used\")",
      "right": "required (\"M\")",
      "left_pages": "11",
      "right_pages": "11",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F005",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "B10@020/B1002",
      "right_key": "B10@020/B1002",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "optional (\"Used\")",
      "right": "required (\"M\")",
      "left_pages": "11",
      "right_pages": "11",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F006",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "B10@020/B1002",
      "right_key": "B10@020/B1002",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "not stated",
      "right": "[semantic] Shipment id (SID) from 204-B204. Must be exact.",
      "detail": "not stated in chr-214",
      "left_pages": "11",
      "right_pages": "11",
      "label": "",
      "note": ""
    },
    {
      "unit": "F007",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "B10@020/B1003",
      "right_key": "B10@020/B1003",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "required (\"Used\")",
      "right": "required (\"M\")",
      "left_pages": "11",
      "right_pages": "11",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F008",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "L11@030",
      "right_key": "L11@030",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "required (\"Must use\")",
      "right": "required (\"Mandatory\")",
      "left_pages": "3,12",
      "right_pages": "2,6,12",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F009",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "L11@030",
      "right_key": "L11@030",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "same",
      "left": "max use 300",
      "right": "max use 300",
      "left_pages": "3,12",
      "right_pages": "2,6,12",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F010",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "L11@030",
      "right_key": "L11@030",
      "alignment": "exact",
      "category": "condition",
      "verdict": "review",
      "left": "[semantic] AG - Qualifer is MANDATORY on all 214's. | [syntax] P0102 - If either L1101 or L1102 is present, then the other is required. | [syntax] R0103 - At least one of L1101 or L1103 is required.",
      "right": "[syntax] L1101 is required. | [syntax] If either L1101 or L1102 is present, then the other is required. | [semantic] The Bill of Lading number is required. From 204-L11 w/BM qualifier. Must be exact. | [context] Continuous Move Number and Return Goods Authorization Number are optional and will only be required upon request.",
      "detail": "3 vs 4 conditions in free text",
      "left_pages": "3,12",
      "right_pages": "2,6,12",
      "label": "",
      "note": ""
    },
    {
      "unit": "F011",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "L11@030/L1101",
      "right_key": "L11@030/L1101",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "required (\"Must use\")",
      "right": "required (\"M\")",
      "left_pages": "12",
      "right_pages": "12",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F012",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "L11@030/L1101",
      "right_key": "L11@030/L1101",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[semantic] C.H. Robinson Load Number - AG Qualifier (Should match the Load Number in the B10_02)",
      "right": "not stated",
      "detail": "not stated in kbx-214",
      "left_pages": "12",
      "right_pages": "12",
      "label": "",
      "note": ""
    },
    {
      "unit": "F013",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "L11@030/L1102",
      "right_key": "L11@030/L1102",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "required (\"Must use\")",
      "right": "required (\"M\")",
      "left_pages": "12",
      "right_pages": "12",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F014",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "L11@030/L1102",
      "right_key": "L11@030/L1102",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "AG",
      "right": "4F, BM, BN, CMN, PO, PRT, RB, RZ and 2 more (10 codes)",
      "detail": "only in chr-214: AG; only in kbx-214: 4F, BM, BN, CMN, PO, PRT, RB, RZ and 2 more (10 codes)",
      "left_pages": "12",
      "right_pages": "12",
      "label": "",
      "note": ""
    },
    {
      "unit": "F015",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "L11@030/L1102",
      "right_key": "L11@030/L1102",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "not stated",
      "right": "[semantic] 4F Reference will be sent to a carrier in the outbound 204 from KBXTECH and should be returned on the 214 as it was sent. | [context] Carriers who are not getting a 204 tender from KBXTECH will be instructed on the proper code to be used when sending an EDI 214 message.",
      "detail": "not stated in chr-214",
      "left_pages": "12",
      "right_pages": "12",
      "label": "",
      "note": ""
    },
    {
      "unit": "F016",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:LX@130",
      "right_key": "0200:LX@130",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "required (\"Must use\")",
      "right": "required (\"Mandatory\")",
      "left_pages": "3,4,19",
      "right_pages": "2,6,17",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F017",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:LX@130",
      "right_key": "0200:LX@130",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "same",
      "left": "max use 1; loop repeat 1",
      "right": "max use 1; loop repeat 1",
      "left_pages": "3,4,19",
      "right_pages": "2,6,17",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F018",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:LX@130",
      "right_key": "0200:LX@130",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[semantic] If using the L11 segments to send Lat/Long, you do not need to use both formats. Please choose only one.",
      "right": "not stated",
      "detail": "not stated in kbx-214",
      "left_pages": "3,4,19",
      "right_pages": "2,6,17",
      "label": "",
      "note": ""
    },
    {
      "unit": "F019",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:LX@130/LX01",
      "right_key": "0200:LX@130/LX01",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "required (\"Used\")",
      "right": "required (\"M\")",
      "left_pages": "19",
      "right_pages": "17",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F020",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140",
      "right_key": "0200/0205:AT7@140",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "required (\"Must use\")",
      "right": "required (\"Mandatory\")",
      "left_pages": "3,20,21,22",
      "right_pages": "6,18",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F021",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140",
      "right_key": "0200/0205:AT7@140",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "different",
      "left": "max use 1; loop repeat 1",
      "right": "max use 1; loop repeat 10",
      "detail": "loop repeat 1 vs 10",
      "left_pages": "3,20,21,22",
      "right_pages": "6,18",
      "label": "",
      "note": ""
    },
    {
      "unit": "F022",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140",
      "right_key": "0200/0205:AT7@140",
      "alignment": "exact",
      "category": "condition",
      "verdict": "review",
      "left": "[syntax] C0605 - If AT706 is present, then AT705 is required. | [syntax] C0706 - If AT707 is present, then AT706 is required. | [syntax] E0103 - Only one of AT701 or AT703 may be present. | [syntax] P0102 - If either AT701 or AT702 is present, then the other is required. | [syntax] P0304 - If either AT703 or AT704 is present, then the other is required.",
      "right": "[syntax] Only one of AT701 or AT703 may be present. | [syntax] If either AT701 or AT702 is present, then the other is required. | [syntax] If either AT703 or AT704 is present, then the other is required. | [syntax] AT705 is required. | [syntax] If AT706 is present then AT707 is required. | [semantic] If AT701 is present, AT705 is the date the status occurred. If AT703 is present, AT705 is a date related to an appointment. | [semantic] If AT701 is present, AT706 is the time of the status. If AT703 is present, AT706 is the time of the appointment. | [semantic] An AT701 or AT703 is required. | [semantic] LT is the only allowable Time Code for AT707. All times must be sent in the time zone of the reported location. | [semantic] KBX will use the code ‘ZZ’ in the AT701 for En Route to Pick-Up Reporting | [semantic] XB should be used to indicate a carrier’s Estimated Arrival to the Origin Stop",
      "detail": "5 vs 11 conditions in free text",
      "left_pages": "3,20,21,22",
      "right_pages": "6,18",
      "label": "",
      "note": ""
    },
    {
      "unit": "F023",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140/AT701",
      "right_key": "0200/0205:AT7@140/AT701",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "conditional (\"Used\")",
      "right": "conditional (\"X\")",
      "left_pages": "21",
      "right_pages": "3,5,18",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F024",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140/AT701",
      "right_key": "0200/0205:AT7@140/AT701",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "all standard codes (42)",
      "right": "AF, AG, AR, CD, K1, P1, PR, RA and 8 more (16 codes)",
      "detail": "kbx-214 lists 16 codes, chr-214 allows all standard codes",
      "left_pages": "21",
      "right_pages": "3,5,18",
      "label": "",
      "note": ""
    },
    {
      "unit": "F025",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140/AT701",
      "right_key": "0200/0205:AT7@140/AT701",
      "alignment": "exact",
      "category": "condition",
      "verdict": "review",
      "left": "[context] At a minimum C.H. Robinson must receive the X3 & AF for every Pick Up location and X1 & CD for every Delivery location on all shipments. | [timing] Ideally within 15 minutes of the event. | [timing] C.H. Robinson wants to recieve In-Transit updates every 15 minutes in the form of an X6 status code.",
      "right": "[timing] Please send the Shipment Status Code as soon as you can. Preference would be not to hold the status up for a late reason code. | [context] Truckload: XB, X3, AF, AG, X1 and CD are required (R); X6 is conditional (C*), required unless communicating in-transit through another means (API, P44, Tops2Go); ZZ, PR and K1 are optional (O). | [timing] Send actuals within 1 hour of the event. | [timing] Send trailer / load location updates every 15 minutes. | [semantic] XB Shipment Acknowledged should be used for Estimated Arrival to Origin Stop.",
      "detail": "3 vs 5 conditions in free text",
      "left_pages": "21",
      "right_pages": "3,5,18",
      "label": "",
      "note": ""
    },
    {
      "unit": "F026",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140/AT702",
      "right_key": "0200/0205:AT7@140/AT702",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "conditional (\"Used\")",
      "right": "conditional (\"X\")",
      "left_pages": "21",
      "right_pages": "19,20",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F027",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140/AT702",
      "right_key": "0200/0205:AT7@140/AT702",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "all standard codes (86)",
      "right": "A1, A2, A3, A5, A6, AA, AD, AF and 66 more (74 codes)",
      "detail": "kbx-214 lists 74 codes, chr-214 allows all standard codes",
      "left_pages": "21",
      "right_pages": "19,20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F028",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140/AT702",
      "right_key": "0200/0205:AT7@140/AT702",
      "alignment": "exact",
      "category": "condition",
      "verdict": "review",
      "left": "[semantic] NS - Normal Status or any Late Reason Code if necessary",
      "right": "[timing] Please send the Shipment Status Code as soon as you can. Preference would be not to hold the status up for a late reason code. | [semantic] Use codes pertaining to Shipment Status Reporting. | [semantic] ‘NA’ is NOT VALID for Status Reporting. | [semantic] ‘NS’ should be used for Normal Status.",
      "detail": "1 vs 4 conditions in free text",
      "left_pages": "21",
      "right_pages": "19,20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F029",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140/AT703",
      "right_key": "0200/0205:AT7@140/AT703",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "conditional (\"Used\")",
      "right": "conditional (\"X\")",
      "left_pages": "21",
      "right_pages": "3,5,20",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F030",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140/AT703",
      "right_key": "0200/0205:AT7@140/AT703",
      "alignment": "exact",
      "category": "codes",
      "verdict": "same",
      "left": "AA, AB",
      "right": "AA, AB",
      "left_pages": "21",
      "right_pages": "3,5,20",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F031",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140/AT703",
      "right_key": "0200/0205:AT7@140/AT703",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "not stated",
      "right": "[semantic] AA Pick-up Appointment Date and/or Time (No longer should be used as an Estimated Arrival to Shipper) | [context] Truckload: AB is required (R); AA is conditional (*C), only required if the shipper goes by Appointment. | [semantic] AA should not be used for Estimated Arrival to Origin. Only use AA for communicating Origin Appointments.",
      "detail": "not stated in chr-214",
      "left_pages": "21",
      "right_pages": "3,5,20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F032",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140/AT704",
      "right_key": "0200/0205:AT7@140/AT704",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "conditional (\"Used\")",
      "right": "conditional (\"X\")",
      "left_pages": "21",
      "right_pages": "20",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F033",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140/AT704",
      "right_key": "0200/0205:AT7@140/AT704",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "all standard codes (86)",
      "right": "as AT702: A1, A2, A3, A5, A6, AA, AD, AF and 66 more (74 codes)",
      "detail": "kbx-214 lists 74 codes, chr-214 allows all standard codes",
      "left_pages": "21",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F034",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140/AT704",
      "right_key": "0200/0205:AT7@140/AT704",
      "alignment": "exact",
      "category": "condition",
      "verdict": "review",
      "left": "[semantic] NA - Normal Appointment or any Late Reason Code if necessary",
      "right": "[semantic] Use codes as found in the AT702 data element list pertaining to Appointment Status Reporting. | [semantic] ‘NS’ is NOT VALID for Appointment Reporting. | [semantic] ‘NA’ should be used for Normal Appointments.",
      "detail": "1 vs 3 conditions in free text",
      "left_pages": "21",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F035",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140/AT705",
      "right_key": "0200/0205:AT7@140/AT705",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "required (\"Must use\")",
      "right": "required (\"M\")",
      "left_pages": "21",
      "right_pages": "20",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F036",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140/AT706",
      "right_key": "0200/0205:AT7@140/AT706",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "required (\"Must use\")",
      "right": "conditional (\"X\")",
      "left_pages": "21",
      "right_pages": "20",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F037",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140/AT707",
      "right_key": "0200/0205:AT7@140/AT707",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "conditional (\"Used\")",
      "right": "conditional (\"X\")",
      "left_pages": "22",
      "right_pages": "3,20",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F038",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140/AT707",
      "right_key": "0200/0205:AT7@140/AT707",
      "alignment": "exact",
      "category": "codes",
      "verdict": "same",
      "left": "LT",
      "right": "LT",
      "left_pages": "22",
      "right_pages": "3,20",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F039",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:AT7@140/AT707",
      "right_key": "0200/0205:AT7@140/AT707",
      "alignment": "exact",
      "category": "condition",
      "verdict": "review",
      "left": "[semantic] The status time represents the local time the status occurred.",
      "right": "[semantic] AT7_07 should always contain ‘LT’ for ‘Local Time’ of the appropriate time zone location of the event.",
      "detail": "1 vs 1 conditions in free text",
      "left_pages": "22",
      "right_pages": "3,20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F040",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:MS1@143",
      "right_key": "0200/0205:MS1@143",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "required (\"Must use\")",
      "right": "required (\"Mandatory\")",
      "left_pages": "3,23",
      "right_pages": "6,21",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F041",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:MS1@143",
      "right_key": "0200/0205:MS1@143",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "same",
      "left": "max use 1",
      "right": "max use 1",
      "left_pages": "3,23",
      "right_pages": "6,21",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F042",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:MS1@143",
      "right_key": "0200/0205:MS1@143",
      "alignment": "exact",
      "category": "condition",
      "verdict": "review",
      "left": "[syntax] C0201 - If MS102 is present, then MS101 is required. | [syntax] C0301 - If MS103 is present, then MS101 is required. | [syntax] C0604 - If MS106 is present, then MS104 is required. | [syntax] C0705 - If MS107 is present, then MS105 is required. | [syntax] E0104 - Only one of MS101 or MS104 may be present. | [syntax] P0405 - If either MS104 or MS105 is present, then the other is required. | [syntax] L010203 - If MS101 is present, then at least one of MS102 or MS103 is required.",
      "right": "[syntax] If MS101 is present, then MS102 is required. | [syntax] If MS101 and MS102 are present then MS103 is required if the country is not US. | [syntax] Only one MS101 or MS104 may be present. | [syntax] If MS102 is present, then MS101 is required. | [syntax] If MS103 is present, then MS101 is required. | [syntax] If either MS104 or MS105 is present, then the other is required | [syntax] If MS104 and MS105 are present than MS101, MS102 and MS103 should not be present. | [syntax] If MS104 is present with longitude specified in degrees minutes and seconds format, then MS106 is required. | [syntax] If MS105 is present with latitude specified in degrees minutes and seconds format, then MS107 is required. | [syntax] If MS106 is present, then MS104 is required. | [syntax] If MS107 is present, then MS105 is required. | [semantic] The location information must be the last known equipment location for the Shipment Status Codes (AT701) indicating that a shipment status event has already occurred (IE. AF, X6, X1) and must indicate the intended equipment position for Shipment Status codes (AT701) indicating a future estimated or planned activity (IE. AG, XB). | [semantic] The location information must be the location for which the Shipment Appointment Status Code (AT703) is being reported. | [semantic] Decimal format is no longer an option for sending MS1_04 and MS1_05 | [semantic] The location information can be reported in any of the following formats listed in order of preference: a. Longitude/Latitude in degree/minute/second format; b. City/State/Country",
      "detail": "7 vs 15 conditions in free text",
      "left_pages": "3,23",
      "right_pages": "6,21",
      "label": "",
      "note": ""
    },
    {
      "unit": "F043",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:MS1@143/MS101",
      "right_key": "0200/0205:MS1@143/MS101",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "required (\"Must use\")",
      "right": "conditional (\"X\")",
      "left_pages": "23",
      "right_pages": "21",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F044",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:MS1@143/MS102",
      "right_key": "0200/0205:MS1@143/MS102",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "required (\"Must use\")",
      "right": "conditional (\"X\")",
      "left_pages": "23",
      "right_pages": "21",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F045",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:MS1@143/MS103",
      "right_key": "0200/0205:MS1@143/MS103",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "conditional (\"Used\")",
      "right": "conditional (\"X\")",
      "left_pages": "23",
      "right_pages": "21",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F046",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:MS1@143/MS103",
      "right_key": "0200/0205:MS1@143/MS103",
      "alignment": "exact",
      "category": "codes",
      "verdict": "one_side",
      "left": "not stated",
      "right": "CA, CAN, MEX, MX, US, USA",
      "detail": "not stated in chr-214",
      "left_pages": "23",
      "right_pages": "21",
      "label": "",
      "note": ""
    },
    {
      "unit": "F047",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:MS1@143/MS103",
      "right_key": "0200/0205:MS1@143/MS103",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "not stated",
      "right": "[semantic] Mandatory if not US and MS101 and MS102 are present.",
      "detail": "not stated in chr-214",
      "left_pages": "23",
      "right_pages": "21",
      "label": "",
      "note": ""
    },
    {
      "unit": "F048",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:MS2@146",
      "right_key": "0200/0205:MS2@146",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "optional (\"Used\")",
      "right": "conditional (\"Mandatory except for reporting Appointment Status Codes (AT703)\")",
      "left_pages": "3,24",
      "right_pages": "6,23",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F049",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:MS2@146",
      "right_key": "0200/0205:MS2@146",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "same",
      "left": "max use 1",
      "right": "max use 1",
      "left_pages": "3,24",
      "right_pages": "6,23",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F050",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:MS2@146",
      "right_key": "0200/0205:MS2@146",
      "alignment": "exact",
      "category": "condition",
      "verdict": "review",
      "left": "[syntax] C0402 - If MS204 is present, then MS202 is required. | [syntax] P0102 - If either MS201 or MS202 is present, then the other is required.",
      "right": "[semantic] MS202 is optional for instances when the Equipment number in not known. | [context] The MS2 segment is not required for any status sent prior to Actual Depart Shipper (AT701= AF). | [context] AF must include the MS2 segment and must include the actual Equipment Number that the load is being moved with. | [context] All statuses sent after the Actual Depart from Shipper should have an MS2 segment with the actual Equipment number.",
      "detail": "2 vs 4 conditions in free text",
      "left_pages": "3,24",
      "right_pages": "6,23",
      "label": "",
      "note": ""
    },
    {
      "unit": "F051",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:MS2@146/MS201",
      "right_key": "0200/0205:MS2@146/MS201",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "conditional (\"Used\")",
      "right": "required (\"M\")",
      "left_pages": "24",
      "right_pages": "23",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F052",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:MS2@146/MS202",
      "right_key": "0200/0205:MS2@146/MS202",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "conditional (\"Used\")",
      "right": "optional (\"O\")",
      "left_pages": "24",
      "right_pages": "23",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F053",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:MS2@146/MS203",
      "right_key": "0200/0205:MS2@146/MS203",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "not used (\"Not used\")",
      "right": "optional (\"O\")",
      "left_pages": "24",
      "right_pages": "23,24",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F054",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200/0205:MS2@146/MS203",
      "right_key": "0200/0205:MS2@146/MS203",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "all standard codes (134)",
      "right": "AF, BO, BR, BX, CH, CN, DD, FT and 22 more (30 codes)",
      "detail": "kbx-214 lists 30 codes, chr-214 allows all standard codes",
      "left_pages": "24",
      "right_pages": "23,24",
      "label": "",
      "note": ""
    },
    {
      "unit": "F055",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:L11@150[QN]",
      "right_key": "0200:L11@150",
      "alignment": "qualifier",
      "category": "usage",
      "verdict": "different",
      "left": "required (\"Must use\")",
      "right": "conditional (\"Mandatory except for reporting En Route (AT701 Shipment Status Code is ZZ or X6)\")",
      "left_pages": "3,25",
      "right_pages": "6,25",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F056",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:L11@150[QN]",
      "right_key": "0200:L11@150",
      "alignment": "qualifier",
      "category": "repetition",
      "verdict": "review",
      "left": "max use 1",
      "right": "max use 300",
      "detail": "the definitions cover different qualifiers",
      "left_pages": "3,25",
      "right_pages": "6,25",
      "label": "",
      "note": ""
    },
    {
      "unit": "F057",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:L11@150[QN]",
      "right_key": "0200:L11@150",
      "alignment": "qualifier",
      "category": "condition",
      "verdict": "review",
      "left": "[context] QN - Location Stop Sequence Number is MANDATORY for TRUCKLOAD Carriers. | [semantic] The stop number must match the stop sequence number that corresponds to the location on the load. | [semantic] If you receive the load via 204 the location stop sequence number is in the S5_01. | [semantic] C.H. Robinson does not accept '99' as the final stop. | [syntax] P0102 - If either L1101 or L1102 is present, then the other is required. | [syntax] R0103 - At least one of L1101 or L1103 is required.",
      "right": "[syntax] If either L1101 or L1102 is present, then the other is required. | [semantic] QN is mandatory unless carrier is reporting En Route Status Codes (ZZ or X6) | [semantic] PO is optional | [semantic] VN is mandatory | [semantic] When including the ‘VN’s and ‘PO’s for the stop ALL ‘VN’s and ‘PO’s reported on the load tender for the stop MUST be present. | [context] The L11 segments for stop sequence (QN) are not required for reporting En Route (AT701 Shipment Status Code is ZZ or X6) | [semantic] Stop sequence numbering is ‘01, 02, 03, 04, etc.’ | [semantic] The Stop Number must be the same as communicated on the EDI 204 segment S5 element S501. | [semantic] The initial Pick-up Stop is 01.",
      "detail": "6 vs 9 conditions in free text",
      "left_pages": "3,25",
      "right_pages": "6,25",
      "label": "",
      "note": ""
    },
    {
      "unit": "F058",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:L11@150[QN]/L1101",
      "right_key": "0200:L11@150/L1101",
      "alignment": "qualifier",
      "category": "usage",
      "verdict": "same",
      "left": "required (\"Must use\")",
      "right": "required (\"M\")",
      "left_pages": "25",
      "right_pages": "25",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F059",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:L11@150[QN]/L1101",
      "right_key": "0200:L11@150/L1101",
      "alignment": "qualifier",
      "category": "condition",
      "verdict": "one_side",
      "left": "not stated",
      "right": "[semantic] 2-digit QN Stop Sequence Number must be used",
      "detail": "not stated in chr-214",
      "left_pages": "25",
      "right_pages": "25",
      "label": "",
      "note": ""
    },
    {
      "unit": "F060",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:L11@150[QN]/L1102",
      "right_key": "0200:L11@150/L1102",
      "alignment": "qualifier",
      "category": "usage",
      "verdict": "same",
      "left": "required (\"Must use\")",
      "right": "required (\"M\")",
      "left_pages": "25",
      "right_pages": "25",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F061",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:L11@150[QN]/L1102",
      "right_key": "0200:L11@150/L1102",
      "alignment": "qualifier",
      "category": "codes",
      "verdict": "different",
      "left": "QN",
      "right": "PO, QN, VN",
      "detail": "only in kbx-214: PO, VN",
      "left_pages": "25",
      "right_pages": "25",
      "label": "",
      "note": ""
    },
    {
      "unit": "F062",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:L11@150[QN]/L1102",
      "right_key": "0200:L11@150/L1102",
      "alignment": "qualifier",
      "category": "condition",
      "verdict": "one_side",
      "left": "not stated",
      "right": "[semantic] PO Purchase Order Number (optional) | [semantic] QN Stop Sequence Number (Required on all statuses except X6 or ZZ) | [semantic] VN Vendor Number ‘Internal order#’ (Required)",
      "detail": "not stated in chr-214",
      "left_pages": "25",
      "right_pages": "25",
      "label": "",
      "note": ""
    },
    {
      "unit": "F063",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:AT8@200",
      "right_key": "0200:AT8@200",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "optional (\"Used\")",
      "right": "required (\"Mandatory\")",
      "left_pages": "3,29",
      "right_pages": "6,27",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F064",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:AT8@200",
      "right_key": "0200:AT8@200",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "same",
      "left": "max use 10",
      "right": "max use 10",
      "left_pages": "3,29",
      "right_pages": "6,27",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F065",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:AT8@200",
      "right_key": "0200:AT8@200",
      "alignment": "exact",
      "category": "condition",
      "verdict": "review",
      "left": "[syntax] P0607 - If either AT806 or AT807 is present, then the other is required. | [syntax] P010203 - If either AT801, AT802 or AT803 are present, then the others are required.",
      "right": "[syntax] AT801, AT802, AT803, AT804 are required.",
      "detail": "2 vs 1 conditions in free text",
      "left_pages": "3,29",
      "right_pages": "6,27",
      "label": "",
      "note": ""
    },
    {
      "unit": "F066",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:AT8@200/AT801",
      "right_key": "0200:AT8@200/AT801",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "conditional (\"Used\")",
      "right": "required (\"M\")",
      "left_pages": "29",
      "right_pages": "27",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F067",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:AT8@200/AT801",
      "right_key": "0200:AT8@200/AT801",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "all standard codes (51)",
      "right": "G",
      "detail": "kbx-214 lists 1 code, chr-214 allows all standard codes",
      "left_pages": "29",
      "right_pages": "27",
      "label": "",
      "note": ""
    },
    {
      "unit": "F068",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:AT8@200/AT802",
      "right_key": "0200:AT8@200/AT802",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "conditional (\"Used\")",
      "right": "required (\"M\")",
      "left_pages": "29",
      "right_pages": "27",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F069",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:AT8@200/AT802",
      "right_key": "0200:AT8@200/AT802",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "all standard codes (8)",
      "right": "K, L",
      "detail": "kbx-214 lists 2 codes, chr-214 allows all standard codes",
      "left_pages": "29",
      "right_pages": "27",
      "label": "",
      "note": ""
    },
    {
      "unit": "F070",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:AT8@200/AT803",
      "right_key": "0200:AT8@200/AT803",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "conditional (\"Used\")",
      "right": "required (\"M\")",
      "left_pages": "29",
      "right_pages": "27",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F071",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:AT8@200/AT804",
      "right_key": "0200:AT8@200/AT804",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "optional (\"Used\")",
      "right": "required (\"M\")",
      "left_pages": "29",
      "right_pages": "27",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F072",
      "left_guide": "chr-214",
      "right_guide": "kbx-214",
      "left_key": "0200:AT8@200/AT805",
      "right_key": "0200:AT8@200/AT805",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "optional (\"Used\")",
      "right": "optional (\"O\")",
      "left_pages": "29",
      "right_pages": "27",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F073",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "B10@020",
      "right_key": "B10@020",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "required (\"Used\")",
      "right": "required (\"Mandatory\")",
      "left_pages": "3,11",
      "right_pages": "8,12,13",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F074",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "B10@020",
      "right_key": "B10@020",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "same",
      "left": "max use 1",
      "right": "max use 1",
      "left_pages": "3,11",
      "right_pages": "8,12,13",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F075",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "B10@020",
      "right_key": "B10@020",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[syntax] E0105 - Only one of B1001 or B1005 may be present. | [syntax] P0506 - If either B1005 or B1006 is present, then the other is required. | [syntax] R0106 - At least one of B1001 or B1006 is required.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "3,11",
      "right_pages": "8,12,13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F076",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "B10@020/B1001",
      "right_key": "B10@020/B1001",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"Used\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "11",
      "right_pages": "13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F077",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "B10@020/B1002",
      "right_key": "B10@020/B1002",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "optional (\"Used\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "11",
      "right_pages": "13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F078",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "B10@020/B1003",
      "right_key": "B10@020/B1003",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"Used\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "11",
      "right_pages": "13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F079",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "L11@030",
      "right_key": "L11@030",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "required (\"Must use\")",
      "right": "optional (\"Optional\")",
      "left_pages": "3,12",
      "right_pages": "8,13",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F080",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "L11@030",
      "right_key": "L11@030",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "same",
      "left": "max use 300",
      "right": "max use 300",
      "left_pages": "3,12",
      "right_pages": "8,13",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F081",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "L11@030",
      "right_key": "L11@030",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[semantic] AG - Qualifer is MANDATORY on all 214's. | [syntax] P0102 - If either L1101 or L1102 is present, then the other is required. | [syntax] R0103 - At least one of L1101 or L1103 is required.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "3,12",
      "right_pages": "8,13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F082",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "L11@030/L1101",
      "right_key": "L11@030/L1101",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"Must use\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "12",
      "right_pages": "13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F083",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "L11@030/L1101",
      "right_key": "L11@030/L1101",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[semantic] C.H. Robinson Load Number - AG Qualifier (Should match the Load Number in the B10_02)",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "12",
      "right_pages": "13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F084",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "L11@030/L1102",
      "right_key": "L11@030/L1102",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"Must use\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "12",
      "right_pages": "13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F085",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "L11@030/L1102",
      "right_key": "L11@030/L1102",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "AG",
      "right": "BM, CMN",
      "detail": "only in chr-214: AG; only in domtar-214: BM, CMN",
      "left_pages": "12",
      "right_pages": "13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F086",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200:LX@130",
      "right_key": "0200:LX@130",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "required (\"Must use\")",
      "right": "optional (\"Optional\")",
      "left_pages": "3,4,19",
      "right_pages": "8,17",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F087",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200:LX@130",
      "right_key": "0200:LX@130",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "different",
      "left": "max use 1; loop repeat 1",
      "right": "max use 1; loop repeat 999999",
      "detail": "loop repeat 1 vs 999999",
      "left_pages": "3,4,19",
      "right_pages": "8,17",
      "label": "",
      "note": ""
    },
    {
      "unit": "F088",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200:LX@130",
      "right_key": "0200:LX@130",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[semantic] If using the L11 segments to send Lat/Long, you do not need to use both formats. Please choose only one.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "3,4,19",
      "right_pages": "8,17",
      "label": "",
      "note": ""
    },
    {
      "unit": "F089",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200:LX@130/LX01",
      "right_key": "0200:LX@130/LX01",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"Used\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "19",
      "right_pages": "17",
      "label": "",
      "note": ""
    },
    {
      "unit": "F090",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140",
      "right_key": "0200/0205:AT7@140",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "required (\"Must use\")",
      "right": "optional (\"Optional\")",
      "left_pages": "3,20,21,22",
      "right_pages": "8,17",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F091",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140",
      "right_key": "0200/0205:AT7@140",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "different",
      "left": "max use 1; loop repeat 1",
      "right": "max use 1; loop repeat 10",
      "detail": "loop repeat 1 vs 10",
      "left_pages": "3,20,21,22",
      "right_pages": "8,17",
      "label": "",
      "note": ""
    },
    {
      "unit": "F092",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140",
      "right_key": "0200/0205:AT7@140",
      "alignment": "exact",
      "category": "condition",
      "verdict": "review",
      "left": "[syntax] C0605 - If AT706 is present, then AT705 is required. | [syntax] C0706 - If AT707 is present, then AT706 is required. | [syntax] E0103 - Only one of AT701 or AT703 may be present. | [syntax] P0102 - If either AT701 or AT702 is present, then the other is required. | [syntax] P0304 - If either AT703 or AT704 is present, then the other is required.",
      "right": "[context] Truckload - Minimum of 5 statuses required (AA or EP/AB/AF/X1/D1 or S1)",
      "detail": "5 vs 1 conditions in free text",
      "left_pages": "3,20,21,22",
      "right_pages": "8,17",
      "label": "",
      "note": ""
    },
    {
      "unit": "F093",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT701",
      "right_key": "0200/0205:AT7@140/AT701",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "conditional (\"Used\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "21",
      "right_pages": "17,18",
      "label": "",
      "note": ""
    },
    {
      "unit": "F094",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT701",
      "right_key": "0200/0205:AT7@140/AT701",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "all standard codes (42)",
      "right": "A3, A7, A9, AF, AH, AI, AJ, AM and 30 more (38 codes)",
      "detail": "domtar-214 lists 38 codes, chr-214 allows all standard codes",
      "left_pages": "21",
      "right_pages": "17,18",
      "label": "",
      "note": ""
    },
    {
      "unit": "F095",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT701",
      "right_key": "0200/0205:AT7@140/AT701",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[context] At a minimum C.H. Robinson must receive the X3 & AF for every Pick Up location and X1 & CD for every Delivery location on all shipments. | [timing] Ideally within 15 minutes of the event. | [timing] C.H. Robinson wants to recieve In-Transit updates every 15 minutes in the form of an X6 status code.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "21",
      "right_pages": "17,18",
      "label": "",
      "note": ""
    },
    {
      "unit": "F096",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT702",
      "right_key": "0200/0205:AT7@140/AT702",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "conditional (\"Used\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "21",
      "right_pages": "18,19",
      "label": "",
      "note": ""
    },
    {
      "unit": "F097",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT702",
      "right_key": "0200/0205:AT7@140/AT702",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "all standard codes (86)",
      "right": "A1, A2, A3, A5, A6, AA, AD, AF and 62 more (70 codes)",
      "detail": "domtar-214 lists 70 codes, chr-214 allows all standard codes",
      "left_pages": "21",
      "right_pages": "18,19",
      "label": "",
      "note": ""
    },
    {
      "unit": "F098",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT702",
      "right_key": "0200/0205:AT7@140/AT702",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[semantic] NS - Normal Status or any Late Reason Code if necessary",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "21",
      "right_pages": "18,19",
      "label": "",
      "note": ""
    },
    {
      "unit": "F099",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT703",
      "right_key": "0200/0205:AT7@140/AT703",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "conditional (\"Used\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "21",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F100",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT703",
      "right_key": "0200/0205:AT7@140/AT703",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "AA, AB",
      "right": "AA, AB, AC, EP",
      "detail": "only in domtar-214: AC, EP",
      "left_pages": "21",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F101",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT704",
      "right_key": "0200/0205:AT7@140/AT704",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "conditional (\"Used\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "21",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F102",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT704",
      "right_key": "0200/0205:AT7@140/AT704",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "all standard codes (86)",
      "right": "as AT702: A1, A2, A3, A5, A6, AA, AD, AF and 62 more (70 codes)",
      "detail": "domtar-214 lists 70 codes, chr-214 allows all standard codes",
      "left_pages": "21",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F103",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT704",
      "right_key": "0200/0205:AT7@140/AT704",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[semantic] NA - Normal Appointment or any Late Reason Code if necessary",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "21",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F104",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT705",
      "right_key": "0200/0205:AT7@140/AT705",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"Must use\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "21",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F105",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT706",
      "right_key": "0200/0205:AT7@140/AT706",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"Must use\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "21",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F106",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT707",
      "right_key": "0200/0205:AT7@140/AT707",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "conditional (\"Used\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "22",
      "right_pages": "9,20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F107",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT707",
      "right_key": "0200/0205:AT7@140/AT707",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "LT",
      "right": "CT, ET, MT, PT",
      "detail": "only in chr-214: LT; only in domtar-214: CT, ET, MT, PT",
      "left_pages": "22",
      "right_pages": "9,20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F108",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT707",
      "right_key": "0200/0205:AT7@140/AT707",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[semantic] The status time represents the local time the status occurred.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "22",
      "right_pages": "9,20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F109",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS1@143",
      "right_key": "0200/0205:MS1@143",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "required (\"Must use\")",
      "right": "optional (\"Optional\")",
      "left_pages": "3,23",
      "right_pages": "8,20",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F110",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS1@143",
      "right_key": "0200/0205:MS1@143",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "same",
      "left": "max use 1",
      "right": "max use 1",
      "left_pages": "3,23",
      "right_pages": "8,20",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F111",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS1@143",
      "right_key": "0200/0205:MS1@143",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[syntax] C0201 - If MS102 is present, then MS101 is required. | [syntax] C0301 - If MS103 is present, then MS101 is required. | [syntax] C0604 - If MS106 is present, then MS104 is required. | [syntax] C0705 - If MS107 is present, then MS105 is required. | [syntax] E0104 - Only one of MS101 or MS104 may be present. | [syntax] P0405 - If either MS104 or MS105 is present, then the other is required. | [syntax] L010203 - If MS101 is present, then at least one of MS102 or MS103 is required.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "3,23",
      "right_pages": "8,20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F112",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS1@143/MS101",
      "right_key": "0200/0205:MS1@143/MS101",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"Must use\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "23",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F113",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS1@143/MS102",
      "right_key": "0200/0205:MS1@143/MS102",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"Must use\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "23",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F114",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS1@143/MS103",
      "right_key": "0200/0205:MS1@143/MS103",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "conditional (\"Used\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "23",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F115",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS1@143/MS103",
      "right_key": "0200/0205:MS1@143/MS103",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "not stated",
      "right": "[semantic] Shown if not U.S.",
      "detail": "not stated in chr-214",
      "left_pages": "23",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F116",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS2@146",
      "right_key": "0200/0205:MS2@146",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "optional (\"Used\")",
      "right": "optional (\"Optional\")",
      "left_pages": "3,24",
      "right_pages": "8,20",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F117",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS2@146",
      "right_key": "0200/0205:MS2@146",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "same",
      "left": "max use 1",
      "right": "max use 1",
      "left_pages": "3,24",
      "right_pages": "8,20",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F118",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS2@146",
      "right_key": "0200/0205:MS2@146",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[syntax] C0402 - If MS204 is present, then MS202 is required. | [syntax] P0102 - If either MS201 or MS202 is present, then the other is required.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "3,24",
      "right_pages": "8,20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F119",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS2@146/MS201",
      "right_key": "0200/0205:MS2@146/MS201",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "conditional (\"Used\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "24",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F120",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS2@146/MS202",
      "right_key": "0200/0205:MS2@146/MS202",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "conditional (\"Used\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "24",
      "right_pages": "21",
      "label": "",
      "note": ""
    },
    {
      "unit": "F121",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200:L11@150[QN]",
      "right_key": "0200:L11@150",
      "alignment": "qualifier",
      "category": "usage",
      "verdict": "different",
      "left": "required (\"Must use\")",
      "right": "optional (\"Optional\")",
      "left_pages": "3,25",
      "right_pages": "8,22",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F122",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200:L11@150[QN]",
      "right_key": "0200:L11@150",
      "alignment": "qualifier",
      "category": "repetition",
      "verdict": "review",
      "left": "max use 1",
      "right": "max use 10",
      "detail": "the definitions cover different qualifiers",
      "left_pages": "3,25",
      "right_pages": "8,22",
      "label": "",
      "note": ""
    },
    {
      "unit": "F123",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200:L11@150[QN]",
      "right_key": "0200:L11@150",
      "alignment": "qualifier",
      "category": "condition",
      "verdict": "one_side",
      "left": "[context] QN - Location Stop Sequence Number is MANDATORY for TRUCKLOAD Carriers. | [semantic] The stop number must match the stop sequence number that corresponds to the location on the load. | [semantic] If you receive the load via 204 the location stop sequence number is in the S5_01. | [semantic] C.H. Robinson does not accept '99' as the final stop. | [syntax] P0102 - If either L1101 or L1102 is present, then the other is required. | [syntax] R0103 - At least one of L1101 or L1103 is required.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "3,25",
      "right_pages": "8,22",
      "label": "",
      "note": ""
    },
    {
      "unit": "F124",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200:L11@150[QN]/L1101",
      "right_key": "0200:L11@150/L1101",
      "alignment": "qualifier",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"Must use\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "25",
      "right_pages": "22",
      "label": "",
      "note": ""
    },
    {
      "unit": "F125",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200:L11@150[QN]/L1102",
      "right_key": "0200:L11@150/L1102",
      "alignment": "qualifier",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"Must use\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "25",
      "right_pages": "22",
      "label": "",
      "note": ""
    },
    {
      "unit": "F126",
      "left_guide": "chr-214",
      "right_guide": "domtar-214",
      "left_key": "0200:L11@150[QN]/L1102",
      "right_key": "0200:L11@150/L1102",
      "alignment": "qualifier",
      "category": "codes",
      "verdict": "different",
      "left": "QN",
      "right": "QN, VN",
      "detail": "only in domtar-214: VN",
      "left_pages": "25",
      "right_pages": "22",
      "label": "",
      "note": ""
    },
    {
      "unit": "F127",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "B10@020",
      "right_key": "B10@020",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "required (\"Mandatory\")",
      "right": "required (\"Mandatory\")",
      "left_pages": "6,11",
      "right_pages": "8,12,13",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F128",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "B10@020",
      "right_key": "B10@020",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "same",
      "left": "max use 1",
      "right": "max use 1",
      "left_pages": "6,11",
      "right_pages": "8,12,13",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F129",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "B10@020",
      "right_key": "B10@020",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[syntax] B1001 is required. | [syntax] B1002 is required when used in Transaction Set 214. | [syntax] B1003 is required when used in Transaction Set 214.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "6,11",
      "right_pages": "8,12,13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F130",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "B10@020/B1001",
      "right_key": "B10@020/B1001",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"M\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "11",
      "right_pages": "13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F131",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "B10@020/B1002",
      "right_key": "B10@020/B1002",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"M\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "11",
      "right_pages": "13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F132",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "B10@020/B1002",
      "right_key": "B10@020/B1002",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[semantic] Shipment id (SID) from 204-B204. Must be exact.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "11",
      "right_pages": "13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F133",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "B10@020/B1003",
      "right_key": "B10@020/B1003",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"M\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "11",
      "right_pages": "13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F134",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "L11@030",
      "right_key": "L11@030",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "required (\"Mandatory\")",
      "right": "optional (\"Optional\")",
      "left_pages": "2,6,12",
      "right_pages": "8,13",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F135",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "L11@030",
      "right_key": "L11@030",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "same",
      "left": "max use 300",
      "right": "max use 300",
      "left_pages": "2,6,12",
      "right_pages": "8,13",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F136",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "L11@030",
      "right_key": "L11@030",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[syntax] L1101 is required. | [syntax] If either L1101 or L1102 is present, then the other is required. | [semantic] The Bill of Lading number is required. From 204-L11 w/BM qualifier. Must be exact. | [context] Continuous Move Number and Return Goods Authorization Number are optional and will only be required upon request.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "2,6,12",
      "right_pages": "8,13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F137",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "L11@030/L1101",
      "right_key": "L11@030/L1101",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"M\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "12",
      "right_pages": "13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F138",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "L11@030/L1102",
      "right_key": "L11@030/L1102",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"M\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "12",
      "right_pages": "13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F139",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "L11@030/L1102",
      "right_key": "L11@030/L1102",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "4F, BM, BN, CMN, PO, PRT, RB, RZ and 2 more (10 codes)",
      "right": "BM, CMN",
      "detail": "only in kbx-214: 4F, BN, PO, PRT, RB, RZ, SI, VN",
      "left_pages": "12",
      "right_pages": "13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F140",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "L11@030/L1102",
      "right_key": "L11@030/L1102",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[semantic] 4F Reference will be sent to a carrier in the outbound 204 from KBXTECH and should be returned on the 214 as it was sent. | [context] Carriers who are not getting a 204 tender from KBXTECH will be instructed on the proper code to be used when sending an EDI 214 message.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "12",
      "right_pages": "13",
      "label": "",
      "note": ""
    },
    {
      "unit": "F141",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200:LX@130",
      "right_key": "0200:LX@130",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "required (\"Mandatory\")",
      "right": "optional (\"Optional\")",
      "left_pages": "2,6,17",
      "right_pages": "8,17",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F142",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200:LX@130",
      "right_key": "0200:LX@130",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "different",
      "left": "max use 1; loop repeat 1",
      "right": "max use 1; loop repeat 999999",
      "detail": "loop repeat 1 vs 999999",
      "left_pages": "2,6,17",
      "right_pages": "8,17",
      "label": "",
      "note": ""
    },
    {
      "unit": "F143",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200:LX@130/LX01",
      "right_key": "0200:LX@130/LX01",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"M\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "17",
      "right_pages": "17",
      "label": "",
      "note": ""
    },
    {
      "unit": "F144",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140",
      "right_key": "0200/0205:AT7@140",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "required (\"Mandatory\")",
      "right": "optional (\"Optional\")",
      "left_pages": "6,18",
      "right_pages": "8,17",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F145",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140",
      "right_key": "0200/0205:AT7@140",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "same",
      "left": "max use 1; loop repeat 10",
      "right": "max use 1; loop repeat 10",
      "left_pages": "6,18",
      "right_pages": "8,17",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F146",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140",
      "right_key": "0200/0205:AT7@140",
      "alignment": "exact",
      "category": "condition",
      "verdict": "review",
      "left": "[syntax] Only one of AT701 or AT703 may be present. | [syntax] If either AT701 or AT702 is present, then the other is required. | [syntax] If either AT703 or AT704 is present, then the other is required. | [syntax] AT705 is required. | [syntax] If AT706 is present then AT707 is required. | [semantic] If AT701 is present, AT705 is the date the status occurred. If AT703 is present, AT705 is a date related to an appointment. | [semantic] If AT701 is present, AT706 is the time of the status. If AT703 is present, AT706 is the time of the appointment. | [semantic] An AT701 or AT703 is required. | [semantic] LT is the only allowable Time Code for AT707. All times must be sent in the time zone of the reported location. | [semantic] KBX will use the code ‘ZZ’ in the AT701 for En Route to Pick-Up Reporting | [semantic] XB should be used to indicate a carrier’s Estimated Arrival to the Origin Stop",
      "right": "[context] Truckload - Minimum of 5 statuses required (AA or EP/AB/AF/X1/D1 or S1)",
      "detail": "11 vs 1 conditions in free text",
      "left_pages": "6,18",
      "right_pages": "8,17",
      "label": "",
      "note": ""
    },
    {
      "unit": "F147",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT701",
      "right_key": "0200/0205:AT7@140/AT701",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "conditional (\"X\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "3,5,18",
      "right_pages": "17,18",
      "label": "",
      "note": ""
    },
    {
      "unit": "F148",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT701",
      "right_key": "0200/0205:AT7@140/AT701",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "AF, AG, AR, CD, K1, P1, PR, RA and 8 more (16 codes)",
      "right": "A3, A7, A9, AF, AH, AI, AJ, AM and 30 more (38 codes)",
      "detail": "only in kbx-214: AG, RA, RD, XB, ZZ; only in domtar-214: A3, A7, A9, AH, AI, AJ, AM, AP and 19 more (27 codes)",
      "left_pages": "3,5,18",
      "right_pages": "17,18",
      "label": "",
      "note": ""
    },
    {
      "unit": "F149",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT701",
      "right_key": "0200/0205:AT7@140/AT701",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[timing] Please send the Shipment Status Code as soon as you can. Preference would be not to hold the status up for a late reason code. | [context] Truckload: XB, X3, AF, AG, X1 and CD are required (R); X6 is conditional (C*), required unless communicating in-transit through another means (API, P44, Tops2Go); ZZ, PR and K1 are optional (O). | [timing] Send actuals within 1 hour of the event. | [timing] Send trailer / load location updates every 15 minutes. | [semantic] XB Shipment Acknowledged should be used for Estimated Arrival to Origin Stop.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "3,5,18",
      "right_pages": "17,18",
      "label": "",
      "note": ""
    },
    {
      "unit": "F150",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT702",
      "right_key": "0200/0205:AT7@140/AT702",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "conditional (\"X\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "19,20",
      "right_pages": "18,19",
      "label": "",
      "note": ""
    },
    {
      "unit": "F151",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT702",
      "right_key": "0200/0205:AT7@140/AT702",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "A1, A2, A3, A5, A6, AA, AD, AF and 66 more (74 codes)",
      "right": "A1, A2, A3, A5, A6, AA, AD, AF and 62 more (70 codes)",
      "detail": "only in kbx-214: AG, AJ, BG, C4, NS; only in domtar-214: AZ",
      "left_pages": "19,20",
      "right_pages": "18,19",
      "label": "",
      "note": ""
    },
    {
      "unit": "F152",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT702",
      "right_key": "0200/0205:AT7@140/AT702",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[timing] Please send the Shipment Status Code as soon as you can. Preference would be not to hold the status up for a late reason code. | [semantic] Use codes pertaining to Shipment Status Reporting. | [semantic] ‘NA’ is NOT VALID for Status Reporting. | [semantic] ‘NS’ should be used for Normal Status.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "19,20",
      "right_pages": "18,19",
      "label": "",
      "note": ""
    },
    {
      "unit": "F153",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT703",
      "right_key": "0200/0205:AT7@140/AT703",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "conditional (\"X\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "3,5,20",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F154",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT703",
      "right_key": "0200/0205:AT7@140/AT703",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "AA, AB",
      "right": "AA, AB, AC, EP",
      "detail": "only in domtar-214: AC, EP",
      "left_pages": "3,5,20",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F155",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT703",
      "right_key": "0200/0205:AT7@140/AT703",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[semantic] AA Pick-up Appointment Date and/or Time (No longer should be used as an Estimated Arrival to Shipper) | [context] Truckload: AB is required (R); AA is conditional (*C), only required if the shipper goes by Appointment. | [semantic] AA should not be used for Estimated Arrival to Origin. Only use AA for communicating Origin Appointments.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "3,5,20",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F156",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT704",
      "right_key": "0200/0205:AT7@140/AT704",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "conditional (\"X\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "20",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F157",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT704",
      "right_key": "0200/0205:AT7@140/AT704",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "as AT702: A1, A2, A3, A5, A6, AA, AD, AF and 66 more (74 codes)",
      "right": "as AT702: A1, A2, A3, A5, A6, AA, AD, AF and 62 more (70 codes)",
      "detail": "only in kbx-214: AG, AJ, BG, C4, NS; only in domtar-214: AZ",
      "left_pages": "20",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F158",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT704",
      "right_key": "0200/0205:AT7@140/AT704",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[semantic] Use codes as found in the AT702 data element list pertaining to Appointment Status Reporting. | [semantic] ‘NS’ is NOT VALID for Appointment Reporting. | [semantic] ‘NA’ should be used for Normal Appointments.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "20",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F159",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT705",
      "right_key": "0200/0205:AT7@140/AT705",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"M\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "20",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F160",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT706",
      "right_key": "0200/0205:AT7@140/AT706",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "conditional (\"X\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "20",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F161",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT707",
      "right_key": "0200/0205:AT7@140/AT707",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "conditional (\"X\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "3,20",
      "right_pages": "9,20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F162",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT707",
      "right_key": "0200/0205:AT7@140/AT707",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "LT",
      "right": "CT, ET, MT, PT",
      "detail": "only in kbx-214: LT; only in domtar-214: CT, ET, MT, PT",
      "left_pages": "3,20",
      "right_pages": "9,20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F163",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:AT7@140/AT707",
      "right_key": "0200/0205:AT7@140/AT707",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[semantic] AT7_07 should always contain ‘LT’ for ‘Local Time’ of the appropriate time zone location of the event.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "3,20",
      "right_pages": "9,20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F164",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS1@143",
      "right_key": "0200/0205:MS1@143",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "required (\"Mandatory\")",
      "right": "optional (\"Optional\")",
      "left_pages": "6,21",
      "right_pages": "8,20",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F165",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS1@143",
      "right_key": "0200/0205:MS1@143",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "same",
      "left": "max use 1",
      "right": "max use 1",
      "left_pages": "6,21",
      "right_pages": "8,20",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F166",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS1@143",
      "right_key": "0200/0205:MS1@143",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[syntax] If MS101 is present, then MS102 is required. | [syntax] If MS101 and MS102 are present then MS103 is required if the country is not US. | [syntax] Only one MS101 or MS104 may be present. | [syntax] If MS102 is present, then MS101 is required. | [syntax] If MS103 is present, then MS101 is required. | [syntax] If either MS104 or MS105 is present, then the other is required | [syntax] If MS104 and MS105 are present than MS101, MS102 and MS103 should not be present. | [syntax] If MS104 is present with longitude specified in degrees minutes and seconds format, then MS106 is required. | [syntax] If MS105 is present with latitude specified in degrees minutes and seconds format, then MS107 is required. | [syntax] If MS106 is present, then MS104 is required. | [syntax] If MS107 is present, then MS105 is required. | [semantic] The location information must be the last known equipment location for the Shipment Status Codes (AT701) indicating that a shipment status event has already occurred (IE. AF, X6, X1) and must indicate the intended equipment position for Shipment Status codes (AT701) indicating a future estimated or planned activity (IE. AG, XB). | [semantic] The location information must be the location for which the Shipment Appointment Status Code (AT703) is being reported. | [semantic] Decimal format is no longer an option for sending MS1_04 and MS1_05 | [semantic] The location information can be reported in any of the following formats listed in order of preference: a. Longitude/Latitude in degree/minute/second format; b. City/State/Country",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "6,21",
      "right_pages": "8,20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F167",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS1@143/MS101",
      "right_key": "0200/0205:MS1@143/MS101",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "conditional (\"X\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "21",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F168",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS1@143/MS102",
      "right_key": "0200/0205:MS1@143/MS102",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "conditional (\"X\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "21",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F169",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS1@143/MS103",
      "right_key": "0200/0205:MS1@143/MS103",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "conditional (\"X\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "21",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F170",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS1@143/MS103",
      "right_key": "0200/0205:MS1@143/MS103",
      "alignment": "exact",
      "category": "codes",
      "verdict": "one_side",
      "left": "CA, CAN, MEX, MX, US, USA",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "21",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F171",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS1@143/MS103",
      "right_key": "0200/0205:MS1@143/MS103",
      "alignment": "exact",
      "category": "condition",
      "verdict": "review",
      "left": "[semantic] Mandatory if not US and MS101 and MS102 are present.",
      "right": "[semantic] Shown if not U.S.",
      "detail": "1 vs 1 conditions in free text",
      "left_pages": "21",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F172",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS2@146",
      "right_key": "0200/0205:MS2@146",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "conditional (\"Mandatory except for reporting Appointment Status Codes (AT703)\")",
      "right": "optional (\"Optional\")",
      "left_pages": "6,23",
      "right_pages": "8,20",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F173",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS2@146",
      "right_key": "0200/0205:MS2@146",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "same",
      "left": "max use 1",
      "right": "max use 1",
      "left_pages": "6,23",
      "right_pages": "8,20",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F174",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS2@146",
      "right_key": "0200/0205:MS2@146",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[semantic] MS202 is optional for instances when the Equipment number in not known. | [context] The MS2 segment is not required for any status sent prior to Actual Depart Shipper (AT701= AF). | [context] AF must include the MS2 segment and must include the actual Equipment Number that the load is being moved with. | [context] All statuses sent after the Actual Depart from Shipper should have an MS2 segment with the actual Equipment number.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "6,23",
      "right_pages": "8,20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F175",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS2@146/MS201",
      "right_key": "0200/0205:MS2@146/MS201",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"M\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "23",
      "right_pages": "20",
      "label": "",
      "note": ""
    },
    {
      "unit": "F176",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200/0205:MS2@146/MS202",
      "right_key": "0200/0205:MS2@146/MS202",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "optional (\"O\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "23",
      "right_pages": "21",
      "label": "",
      "note": ""
    },
    {
      "unit": "F177",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200:L11@150",
      "right_key": "0200:L11@150",
      "alignment": "exact",
      "category": "usage",
      "verdict": "different",
      "left": "conditional (\"Mandatory except for reporting En Route (AT701 Shipment Status Code is ZZ or X6)\")",
      "right": "optional (\"Optional\")",
      "left_pages": "6,25",
      "right_pages": "8,22",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F178",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200:L11@150",
      "right_key": "0200:L11@150",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "different",
      "left": "max use 300",
      "right": "max use 10",
      "detail": "max use 300 vs 10",
      "left_pages": "6,25",
      "right_pages": "8,22",
      "label": "",
      "note": ""
    },
    {
      "unit": "F179",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200:L11@150",
      "right_key": "0200:L11@150",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[syntax] If either L1101 or L1102 is present, then the other is required. | [semantic] QN is mandatory unless carrier is reporting En Route Status Codes (ZZ or X6) | [semantic] PO is optional | [semantic] VN is mandatory | [semantic] When including the ‘VN’s and ‘PO’s for the stop ALL ‘VN’s and ‘PO’s reported on the load tender for the stop MUST be present. | [context] The L11 segments for stop sequence (QN) are not required for reporting En Route (AT701 Shipment Status Code is ZZ or X6) | [semantic] Stop sequence numbering is ‘01, 02, 03, 04, etc.’ | [semantic] The Stop Number must be the same as communicated on the EDI 204 segment S5 element S501. | [semantic] The initial Pick-up Stop is 01.",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "6,25",
      "right_pages": "8,22",
      "label": "",
      "note": ""
    },
    {
      "unit": "F180",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200:L11@150/L1101",
      "right_key": "0200:L11@150/L1101",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"M\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "25",
      "right_pages": "22",
      "label": "",
      "note": ""
    },
    {
      "unit": "F181",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200:L11@150/L1101",
      "right_key": "0200:L11@150/L1101",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[semantic] 2-digit QN Stop Sequence Number must be used",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "25",
      "right_pages": "22",
      "label": "",
      "note": ""
    },
    {
      "unit": "F182",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200:L11@150/L1102",
      "right_key": "0200:L11@150/L1102",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"M\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "25",
      "right_pages": "22",
      "label": "",
      "note": ""
    },
    {
      "unit": "F183",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200:L11@150/L1102",
      "right_key": "0200:L11@150/L1102",
      "alignment": "exact",
      "category": "codes",
      "verdict": "different",
      "left": "PO, QN, VN",
      "right": "QN, VN",
      "detail": "only in kbx-214: PO",
      "left_pages": "25",
      "right_pages": "22",
      "label": "",
      "note": ""
    },
    {
      "unit": "F184",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200:L11@150/L1102",
      "right_key": "0200:L11@150/L1102",
      "alignment": "exact",
      "category": "condition",
      "verdict": "one_side",
      "left": "[semantic] PO Purchase Order Number (optional) | [semantic] QN Stop Sequence Number (Required on all statuses except X6 or ZZ) | [semantic] VN Vendor Number ‘Internal order#’ (Required)",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "25",
      "right_pages": "22",
      "label": "",
      "note": ""
    },
    {
      "unit": "F185",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200:K1@170",
      "right_key": "0200:K1@170",
      "alignment": "exact",
      "category": "usage",
      "verdict": "same",
      "left": "optional (\"Optional\")",
      "right": "optional (\"Optional\")",
      "left_pages": "6,26",
      "right_pages": "8,22",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F186",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200:K1@170",
      "right_key": "0200:K1@170",
      "alignment": "exact",
      "category": "repetition",
      "verdict": "same",
      "left": "max use 10",
      "right": "max use 10",
      "left_pages": "6,26",
      "right_pages": "8,22",
      "detail": "",
      "label": "",
      "note": ""
    },
    {
      "unit": "F187",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200:K1@170/K101",
      "right_key": "0200:K1@170/K101",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "required (\"M\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "26",
      "right_pages": "22",
      "label": "",
      "note": ""
    },
    {
      "unit": "F188",
      "left_guide": "kbx-214",
      "right_guide": "domtar-214",
      "left_key": "0200:K1@170/K102",
      "right_key": "0200:K1@170/K102",
      "alignment": "exact",
      "category": "usage",
      "verdict": "one_side",
      "left": "optional (\"O\")",
      "right": "not stated",
      "detail": "not stated in domtar-214",
      "left_pages": "26",
      "right_pages": "22",
      "label": "",
      "note": ""
    }
  ],
  "reports": [
    {
      "left": "chr-214",
      "right": "kbx-214",
      "left_only": [
        {
          "key": "0200/0205:MS2@146/MS204",
          "pages": [
            24
          ]
        },
        {
          "key": "0200:L11@150[LH,LL]",
          "pages": [
            3,
            27
          ]
        },
        {
          "key": "0200:L11@150[LH,LL]/L1101",
          "pages": [
            27
          ]
        },
        {
          "key": "0200:L11@150[LH,LL]/L1102",
          "pages": [
            27
          ]
        },
        {
          "key": "0200:L11@150[LK,LQ]",
          "pages": [
            3,
            26
          ]
        },
        {
          "key": "0200:L11@150[LK,LQ]/L1101",
          "pages": [
            26
          ]
        },
        {
          "key": "0200:L11@150[LK,LQ]/L1102",
          "pages": [
            26
          ]
        },
        {
          "key": "0200:L11@150[LK,LQ]/L1103",
          "pages": [
            26
          ]
        },
        {
          "key": "0200:L11@150[VT]",
          "pages": [
            3,
            28
          ]
        },
        {
          "key": "0200:L11@150[VT]/L1101",
          "pages": [
            28
          ]
        },
        {
          "key": "0200:L11@150[VT]/L1102",
          "pages": [
            28
          ]
        }
      ],
      "right_only": [
        {
          "key": "0200/0205:MS1@143/MS104",
          "pages": [
            21,
            22
          ]
        },
        {
          "key": "0200/0205:MS1@143/MS105",
          "pages": [
            22
          ]
        },
        {
          "key": "0200/0205:MS1@143/MS106",
          "pages": [
            22
          ]
        },
        {
          "key": "0200/0205:MS1@143/MS107",
          "pages": [
            22
          ]
        },
        {
          "key": "0200:K1@170",
          "pages": [
            6,
            26
          ]
        },
        {
          "key": "0200:K1@170/K101",
          "pages": [
            26
          ]
        },
        {
          "key": "0200:K1@170/K102",
          "pages": [
            26
          ]
        },
        {
          "key": "0200:AT8@200/AT806",
          "pages": [
            27
          ]
        },
        {
          "key": "0200:AT8@200/AT807",
          "pages": [
            27
          ]
        }
      ]
    },
    {
      "left": "chr-214",
      "right": "domtar-214",
      "left_only": [
        {
          "key": "0200/0205:MS2@146/MS203",
          "pages": [
            24
          ]
        },
        {
          "key": "0200/0205:MS2@146/MS204",
          "pages": [
            24
          ]
        },
        {
          "key": "0200:L11@150[LH,LL]",
          "pages": [
            3,
            27
          ]
        },
        {
          "key": "0200:L11@150[LH,LL]/L1101",
          "pages": [
            27
          ]
        },
        {
          "key": "0200:L11@150[LH,LL]/L1102",
          "pages": [
            27
          ]
        },
        {
          "key": "0200:L11@150[LK,LQ]",
          "pages": [
            3,
            26
          ]
        },
        {
          "key": "0200:L11@150[LK,LQ]/L1101",
          "pages": [
            26
          ]
        },
        {
          "key": "0200:L11@150[LK,LQ]/L1102",
          "pages": [
            26
          ]
        },
        {
          "key": "0200:L11@150[LK,LQ]/L1103",
          "pages": [
            26
          ]
        },
        {
          "key": "0200:L11@150[VT]",
          "pages": [
            3,
            28
          ]
        },
        {
          "key": "0200:L11@150[VT]/L1101",
          "pages": [
            28
          ]
        },
        {
          "key": "0200:L11@150[VT]/L1102",
          "pages": [
            28
          ]
        },
        {
          "key": "0200:AT8@200",
          "pages": [
            3,
            29
          ]
        },
        {
          "key": "0200:AT8@200/AT801",
          "pages": [
            29
          ]
        },
        {
          "key": "0200:AT8@200/AT802",
          "pages": [
            29
          ]
        },
        {
          "key": "0200:AT8@200/AT803",
          "pages": [
            29
          ]
        },
        {
          "key": "0200:AT8@200/AT804",
          "pages": [
            29
          ]
        },
        {
          "key": "0200:AT8@200/AT805",
          "pages": [
            29
          ]
        }
      ],
      "right_only": [
        {
          "key": "0200:K1@170",
          "pages": [
            8,
            22
          ]
        },
        {
          "key": "0200:K1@170/K101",
          "pages": [
            22
          ]
        },
        {
          "key": "0200:K1@170/K102",
          "pages": [
            22
          ]
        }
      ]
    },
    {
      "left": "kbx-214",
      "right": "domtar-214",
      "left_only": [
        {
          "key": "0200/0205:MS1@143/MS104",
          "pages": [
            21,
            22
          ]
        },
        {
          "key": "0200/0205:MS1@143/MS105",
          "pages": [
            22
          ]
        },
        {
          "key": "0200/0205:MS1@143/MS106",
          "pages": [
            22
          ]
        },
        {
          "key": "0200/0205:MS1@143/MS107",
          "pages": [
            22
          ]
        },
        {
          "key": "0200/0205:MS2@146/MS203",
          "pages": [
            23,
            24
          ]
        },
        {
          "key": "0200:AT8@200",
          "pages": [
            6,
            27
          ]
        },
        {
          "key": "0200:AT8@200/AT801",
          "pages": [
            27
          ]
        },
        {
          "key": "0200:AT8@200/AT802",
          "pages": [
            27
          ]
        },
        {
          "key": "0200:AT8@200/AT803",
          "pages": [
            27
          ]
        },
        {
          "key": "0200:AT8@200/AT804",
          "pages": [
            27
          ]
        },
        {
          "key": "0200:AT8@200/AT805",
          "pages": [
            27
          ]
        },
        {
          "key": "0200:AT8@200/AT806",
          "pages": [
            27
          ]
        },
        {
          "key": "0200:AT8@200/AT807",
          "pages": [
            27
          ]
        }
      ],
      "right_only": []
    }
  ],
  "stats": {
    "dataset_sha256": "2d1b43f8513c01b63489aa1676da6d2ea4d52187cf56aa85817ed91febd5be95",
    "guide_content_sha256": {
      "chr-214": "652a9061f61336f3827784fa49139c942bea5517a3a4ea6946a859b9da959231",
      "kbx-214": "d658e262609282a8ef8a2313db83600615d089b5b059dc8c140ec98a9882ae6c",
      "domtar-214": "950d55a07f171b717ef2e8be59906d90c4a076f224d7b206ca111a1d74864279"
    },
    "alignment_rule": "qualifier",
    "guides": [
      {
        "id": "chr-214",
        "partner": "C.H. Robinson",
        "requirements": 45,
        "pages": 32
      },
      {
        "id": "kbx-214",
        "partner": "KBX Technology Solutions",
        "requirements": 43,
        "pages": 30
      },
      {
        "id": "domtar-214",
        "partner": "Domtar Industries",
        "requirements": 30,
        "pages": 23
      }
    ],
    "requirements": 118,
    "units": 188,
    "labelled": 0,
    "by_pair": {
      "chr-214 ~ kbx-214": 72,
      "chr-214 ~ domtar-214": 54,
      "kbx-214 ~ domtar-214": 62
    },
    "by_category": {
      "usage": 91,
      "repetition": 23,
      "condition": 48,
      "codes": 26
    },
    "by_verdict": {
      "same": 42,
      "review": 16,
      "different": 52,
      "one_side": 78
    },
    "unmatched_by_pair": [
      {
        "left": "chr-214",
        "right": "kbx-214",
        "left_only": 11,
        "right_only": 9
      },
      {
        "left": "chr-214",
        "right": "domtar-214",
        "left_only": 18,
        "right_only": 3
      },
      {
        "left": "kbx-214",
        "right": "domtar-214",
        "left_only": 13,
        "right_only": 0
      }
    ]
  }
};
