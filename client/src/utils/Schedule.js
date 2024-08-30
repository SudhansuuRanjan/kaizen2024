const day1 = {
    regular: [
        {
            time: '7:00 AM - 8:00 AM',
            events: [
                {
                    name: 'Volleyball Women - Match 1',
                    venue: 'Volleyball Court',
                    id: "1"
                }
            ]
        },
        {
            time: '8:00 AM - 9:00 AM',
            events: [
                {
                    name: 'Volleyball Women - Match 2',
                    venue: 'Volleyball Court',
                    id: "2"
                },
                {
                    name: 'Badminton Match 1 & 2',
                    venue: 'Badminton Court',
                    id: "3"
                },
                {
                    name: 'Table Tennis Match 1 & 2',
                    venue: 'Indoor games room',
                    id: "4"
                }
            ]
        },
        {
            time: '9:00 AM - 10:00 AM',
            events: [
                {
                    name: '100M (M)',
                    venue: 'Avenger’s chauraha',
                    id: "5"
                },
                {
                    name: 'Throwball Match 1',
                    venue: 'Volleyball Court',
                    id: "6"
                },
                {
                    name: 'Badminton Match 3 & 4',
                    venue: 'Badminton Court',
                    id: "7"
                },
                {
                    name: 'Table Tennis Match 3 & 4',
                    venue: 'Indoor games room',
                    id: "8"
                }
            ]
        },
        {
            time: '10:00 AM - 11:00 AM',
            events: [
                {
                    name: '100M (F)',
                    venue: 'Avenger’s chauraha',
                    id: "9"
                },
                {
                    name: 'Throwball Match 2',
                    venue: 'Volleyball Court',
                    id: "10"
                },
                {
                    name: 'Badminton Match 5 & 6',
                    venue: 'Badminton Court',
                    id: "11"
                },
                {
                    name: 'Table Tennis Match 5 & 6',
                    venue: 'Indoor games room',
                    id: "12"
                },
                {
                    name: 'Chess Match 1, 2',
                    venue: 'Indoor games room',
                    id: "13"
                }
            ]
        },
        {
            time: '11:00 AM - 12:00 PM',
            events: [
                {
                    name: 'Badminton Match 7 & 8',
                    venue: 'Badminton Court',
                    id: "14"
                },
                {
                    name: 'Table Tennis Match 7 & 8',
                    venue: 'Indoor games room',
                    id: "15"
                },
                {
                    name: 'Chess Match 3',
                    venue: 'Indoor games room',
                    id: "16"
                }
            ]
        },
        {
            time: '12:00 PM - 1:00 PM',
            events: [
                {
                    name: 'Javelin Throw',
                    venue: 'Football Ground',
                    id: "17"
                },
                {
                    name: 'Badminton Match 9 & 10',
                    venue: 'Badminton Court',
                    id: "18"
                },
                {
                    name: 'Table Tennis Match 9 & 10',
                    venue: 'Indoor games room',
                    id: "19"
                },
                {
                    name: 'Chess Match 4',
                    venue: 'Indoor games room',
                    id: "20"
                }
            ]
        },
        {
            time: '1:00 PM - 2:00 PM',
            events: [
                {
                    name: 'Discus Throw',
                    venue: 'Football Ground',
                    id: "21"
                }
            ]
        },
        {
            time: '2:00 PM - 3:00 PM',
            events: [
                {
                    name: 'Shotput',
                    venue: 'Football Ground',
                    id: "22"
                }
            ]
        },
        {
            time: '3:00 PM - 4:00 PM',
            events: [
                {
                    name: 'Badminton Match 11 & 12',
                    venue: 'Badminton Court',
                    id: "23"
                },
                {
                    name: 'Table Tennis Match 11 & 12',
                    venue: 'Indoor games room',
                    id: "24"
                },
                {
                    name: 'Chess Semi-finals',
                    venue: 'Indoor games room',
                    id: "25"
                }
            ]
        },
        {
            time: '4:00 PM - 5:00 PM',
            events: [
                {
                    name: '200M (M and F)',
                    venue: 'Avenger’s chauraha',
                    id: "26"
                },
                {
                    name: 'Football Semi-final 1',
                    venue: 'Football Ground',
                    id: "27"
                },
                {
                    name: 'Volleyball SF1',
                    venue: 'Volleyball Court',
                    id: "28"
                },
                {
                    name: 'Badminton Match 13 & 14',
                    venue: 'Badminton Court',
                    id: "29"
                },
                {
                    name: 'Table Tennis Match 13 & 14',
                    venue: 'Indoor games room',
                    id: "30"
                }
            ]
        },
        {
            time: '5:00 PM - 6:00 PM',
            events: [
                {
                    name: '4x100M Relay (Men)',
                    venue: 'Avenger’s chauraha',
                    id: "31"
                },
                {
                    name: 'Football Semi-final 2',
                    venue: 'Football Ground',
                    id: "32"
                },
                {
                    name: 'Badminton Match 15 & 16',
                    venue: 'Badminton Court',
                    id: "33"
                },
                {
                    name: 'Table Tennis Match 15 & 16',
                    venue: 'Badminton Court',
                    id: "34"
                },
                {
                    name: 'Volleyball SF1',
                    venue: 'Volleyball Court',
                    id: "35"
                }
            ]
        },
        {
            time: '6:00 PM - 7:00 PM',
            events: [
                {
                    name: '4x100M Relay (Mixed)',
                    venue: 'Avenger’s chauraha',
                    id: "36"
                },
                {
                    name: 'Penalty Shootout',
                    venue: 'Football Ground',
                    id: "37"
                },
                {
                    name: 'Volleyball SF2',
                    venue: 'Volleyball Court',
                    id: "38"
                }
            ]
        },
        {
            time: '7:00 PM - 8:00 PM',
            events: [
                {
                    name: 'Penalty Shootout',
                    venue: 'Football Ground',
                    id: "39"
                },
                {
                    name: 'Volleyball SF2',
                    venue: 'Volleyball Court',
                    id: "40"
                }
            ]
        }
    ]
}

const day2 = {
    regular: [
        {
            time: '8:00 AM - 9:00 AM',
            events: [
                {
                    name: 'Table Tennis F1',
                    venue: 'Indoor games room',
                    id: "1"
                }
            ]
        },
        {
            time: '9:00 AM - 10:00 AM',
            events: [
                {
                    name: '100M (M) Final',
                    venue: 'Avenger’s chauraha',
                    id: "2"
                }
            ]
        },
        {
            time: '10:00 AM - 11:00 AM',
            events: [
                {
                    name: 'Table Tennis F2',
                    venue: 'Indoor games room',
                    id: "3"
                },
                {
                    name: '100M (F) Final',
                    venue: 'Avenger’s chauraha',
                    id: "4"
                },
                {
                    name: 'Table Tennis F3',
                    venue: 'Indoor games room',
                    id: "5"
                }
            ]
        },
        {
            time: '11:00 AM - 12:00 PM',
            events: [
                {
                    name: 'Marathon',
                    venue: 'Avenger’s chauraha',
                    id: "6"
                },
                {
                    name: 'Table Tennis F4',
                    venue: 'Indoor games room',
                    id: "7"
                }
            ]
        },
        {
            time: '12:00 PM - 1:00 PM',
            events: [
                {
                    name: 'Marathon',
                    venue: 'Avenger’s chauraha',
                    id: "8"
                }
            ]
        },
        {
            time: '1:00 PM - 2:00 PM',
            events: [
                {
                    name: 'Marathon',
                    venue: 'Avenger’s chauraha',
                    id: "9"
                }
            ]
        },
        {
            time: '2:00 PM - 3:00 PM',
            events: [
                {
                    name: 'Marathon',
                    venue: 'Avenger’s chauraha',
                    id: "10"
                }
            ]
        },
        {
            time: '3:00 PM - 4:00 PM',
            events: [
                {
                    name: 'Marathon',
                    venue: 'Avenger’s chauraha',
                    id: "11"
                },
                {
                    name: 'Badminton F1',
                    venue: 'Badminton Court',
                    id: "12"
                },
                {
                    name: 'Chess Semi-finals',
                    venue: 'Indoor games room',
                    id: "13"
                }
            ]
        },
        {
            time: '4:00 PM - 5:00 PM',
            events: [
                {
                    name: '200M (M and F) Finals',
                    venue: 'Avenger’s chauraha',
                    id: "14"
                },
                {
                    name: 'Football Final',
                    venue: 'Football Ground',
                    id: "15"
                },
                {
                    name: 'Volley and Throwball Finals',
                    venue: 'Volleyball Court',
                    id: "16"
                },
                {
                    name: 'Badminton F2',
                    venue: 'Badminton Court',
                    id: "17"
                }
            ]
        },
        {
            time: '5:00 PM - 6:00 PM',
            events: [
                {
                    name: '4x100 Relay (Men\'s) Finals',
                    venue: 'Avenger’s chauraha',
                    id: "18"
                },
                {
                    name: 'Football Final',
                    venue: 'Football Ground',
                    id: "19"
                },
                {
                    name: 'Volley and Throwball Finals',
                    venue: 'Volleyball Court',
                    id: "20"
                },
                {
                    name: 'Badminton F3',
                    venue: 'Badminton Court',
                    id: "21"
                }
            ]
        },
        {
            time: '6:00 PM - 7:00 PM',
            events: [
                {
                    name: '4x100 Mixed Finals',
                    venue: 'Avenger’s chauraha',
                    id: "22"
                },
                {
                    name: 'Penalty Shootout Final',
                    venue: 'Football Ground',
                    id: "23"
                },
                {
                    name: 'Volley and Throwball Finals',
                    venue: 'Volleyball Court',
                    id: "24"
                },
                {
                    name: 'Badminton F4',
                    venue: 'Badminton Court',
                    id: "25"
                }
            ]
        }
    ]
}

const day3 = {
    special: [
        {
            name: 'Opening Ceremony',
            venue: "KAIZEN ARENA",
            time: "06:00 PM Onwards",
            id: "01"
        },
        {
            name: 'Sufi Dance',
            venue: "KAIZEN ARENA",
            time: "06:00 PM Onwards",
            id: "02"
        },
        {
            name: 'Band Night',
            venue: "KAIZEN ARENA",
            time: "06:00 PM Onwards",
            id: "03"
        }
    ],
    regular: [
        {
            time: '9:00 AM',
            events: [
                {
                    name: 'Classical Dance-Solo',
                    venue: 'Auditorium',
                    id: "1"
                }
            ]
        },
        {
            time: '9:30 AM',
            events: [
                {
                    name: 'Research Presentation',
                    venue: 'LT 1',
                    id: "2"
                }
            ]
        },
        {
            time: '10:00 AM',
            events: [
                {
                    name: 'T Shirt Painting',
                    venue: 'Admin foyer',
                    id: "3"
                },
                {
                    name: 'NAT Geo Quiz',
                    venue: 'LT 2',
                    id: "4"
                }
            ]
        },
        {
            time: '11:00 AM',
            events: [
                {
                    name: 'Classical Dance-Duet',
                    venue: 'Auditorium',
                    id: "5"
                }
            ]
        },
        {
            time: '11:30 AM',
            events: [
                {
                    name: 'Hot-take',
                    venue: 'E Classroom',
                    id: "6"
                }
            ]
        },
        {
            time: '1:30 PM',
            events: [
                {
                    name: 'Instrumental Solo',
                    venue: 'Auditorium',
                    id: "7"
                },
                {
                    name: 'Rhetorica Hindi',
                    venue: '3 Nursing LTs',
                    id: "8"
                }
            ]
        },
        {
            time: '2:00 PM',
            events: [
                {
                    name: 'Pebble Painting',
                    venue: 'Admin foyer',
                    id: "9"
                },
                {
                    name: 'One word stories',
                    venue: 'LT-2',
                    id: "10"
                }
            ]
        },
        {
            time: '2:30 PM',
            events: [
                {
                    name: 'Sher-o-Shayari',
                    venue: 'LT-3',
                    id: "11"
                }
            ]
        }
    ]
}

const day4 = {
    special: [
        {
            name: 'Fashion Competition',
            venue: "KAIZEN ARENA",
            time: "06:00 PM Onwards",
            id: "01"
        },
        {
            name: 'Fashion Show',
            venue: "KAIZEN ARENA",
            time: "06:00 PM Onwards",
            id: "02"
        },
        {
            name: '⁠Bollywood Music Night',
            venue: "KAIZEN ARENA",
            time: "06:00 PM Onwards",
            id: "03"
        }
    ],
    regular: [
        {
            time: '9:00 AM',
            events: [
                {
                    name: 'Classical Singing',
                    venue: 'Auditorium',
                    id: "1"
                }
            ]
        },
        {
            time: '9:30 AM',
            events: [
                {
                    name: 'Case Presentation',
                    venue: 'LT 1',
                    id: "2"
                }
            ]
        },
        {
            time: '10:30 AM',
            events: [
                {
                    name: 'Contemporary singing- Solo and Duet',
                    venue: 'Auditorium',
                    id: "3"
                }
            ]
        },
        {
            time: '10:00 AM',
            events: [
                {
                    name: 'Watercolour painting',
                    venue: 'Admin foyer',
                    id: "4"
                },
                {
                    name: 'War and (no) peace Quiz',
                    venue: 'LT 2',
                    id: "5"
                }
            ]
        },
        {
            time: '11:00 AM',
            events: [
                {
                    name: 'JAM',
                    venue: 'LT-3',
                    id: "6"
                }
            ]
        },
        {
            time: '1:30 PM',
            events: [
                {
                    name: 'Rhetorica English',
                    venue: 'All LTs',
                    id: "7"
                },
                {
                    name: 'Mask painting',
                    venue: 'Admin foyer',
                    id: "8"
                }
            ]
        },
        {
            time: '2:00 PM',
            events: [
                {
                    name: 'Family Feud',
                    venue: 'LT 1',
                    id: "9"
                }
            ]
        },
        {
            time: '2:30 PM',
            events: [
                {
                    name: 'Rap Battle',
                    venue: 'Auditorium',
                    id: "10"
                }
            ]
        }
    ]
}

const day5 = {
    special: [
        {
            name: 'Comedy Night',
            venue: "KAIZEN ARENA",
            time: "06:00 PM Onwards",
            id: "01"
        },
        {
            name: 'Rap',
            venue: "KAIZEN ARENA",
            time: "06:00 PM Onwards",
            id: "02"
        },
        {
            name: 'EDM night',
            venue: "KAIZEN ARENA",
            time: "06:00 PM Onwards",
            id: "03"
        }
    ],
    regular: [
        {
            time: '9:00 AM',
            events: [
                {
                    name: 'Western Dance',
                    venue: 'Auditorium',
                    id: "1"
                }
            ]
        },
        {
            time: '10:00 AM',
            events: [
                {
                    name: 'Pencil charcoal sketching',
                    venue: 'Admin foyer',
                    id: "2"
                },
                {
                    name: 'Medathena Advanced',
                    venue: 'LT 1',
                    id: "3"
                },
                {
                    name: 'Slam Poetry',
                    venue: 'LT-2',
                    id: "4"
                },
                {
                    name: 'Turncoat Debate-Hindi',
                    venue: 'LT 3',
                    id: "5"
                }
            ]
        },
        {
            time: '1:30 PM',
            events: [
                {
                    name: 'Stand up and mimicry',
                    venue: 'Auditorium',
                    id: "6"
                },
                {
                    name: 'Street Dance',
                    venue: 'Auditorium Entrance',
                    id: "7"
                }
            ]
        },
        {
            time: '2:00 PM',
            events: [
                {
                    name: 'Origami',
                    venue: 'Admin foyer',
                    id: "8"
                },
                {
                    name: 'LAME Quiz',
                    venue: 'LT 2',
                    id: "9"
                },
                {
                    name: 'Medathena Amateur',
                    venue: 'LT 1',
                    id: "10"
                }
            ]
        },
        {
            time: '2:30 PM',
            events: [
                {
                    name: 'Escape Room',
                    venue: 'Nursing LTs',
                    id: "11"
                }
            ]
        }
    ]
}

const day6 = {
    special: [
        {
            name: 'Starnight',
            venue: "KAIZEN ARENA",
            time: "06:00 PM Onwards",
            id: "01"
        }
    ],
    regular: [
        {
            time: '9:00 AM',
            events: [
                {
                    name: 'Battle of Bands',
                    venue: 'Auditorium',
                    id: "1"
                }
            ]
        },
        {
            time: '10:00 AM',
            events: [
                {
                    name: 'Live nature canvas painting',
                    venue: 'Admin foyer',
                    id: "2"
                },
                {
                    name: 'Medathena Elite',
                    venue: 'LT 1',
                    id: "3"
                },
                {
                    name: 'Popcorn Please! Quiz',
                    venue: 'LT 2',
                    id: "4"
                }
            ]
        },
        {
            time: '2:00 PM',
            events: [
               
                {
                    name: 'General Quiz',
                    venue: 'LT 2',
                    id: "5"
                },
                {
                    name: 'Nukkad Natak',
                    venue: 'Admin foyer',
                    id: "6"
                },
                {
                    name: 'Hogathon',
                    venue: 'Intern Mess',
                    id: "7"
                } 
            ]
        },
        {
            time: '2:30 PM',
            events: [
                {
                    name: 'Debate English',
                    venue: 'LT 3',
                    id: "8"
                }
            ]
        }
    ]
}

export { day1, day2, day3, day4, day5, day6 };
