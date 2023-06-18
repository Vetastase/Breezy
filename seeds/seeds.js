const mongoose = require('mongoose');
const User = require('../models/User.model');
const Game = require('../models/Game.model');
 
const MONGO_URI = process.env.MONGODB_URI || 
//"mongodb://127.0.0.1:27017/Breezy";
"https://smoggy-lamb-pantyhose.cyclic.app";
 
  const users = [
  { username: "NabilAslam", email: "nabil.aslam26@gmail.com", password: "$2a$10$NFzGblUJxxfUXH32LP4a5eIr4hXNTQNjHgDjK3ZKn5twj3je9E0Ce", role: "admin" }
]
 
const games = [
  {
    title: "Tales of Arise",
    release: "Sep 10, 2021 by Bandai Namco Entertainment, Bandai Namco Studios",
    description: "On the planet Dahna, reverence has always been given to Rena--the planet in the sky--as a land of the righteous and divine. Stories handed down for generations became truth and masked reality for the people of Dahna. For 300 years, Rena has ruled over Dahna, pillaging the planet of its resources and stripping people of their dignity and freedom. Our tale begins with two people, born on different worlds, each looking to change their fate and create a new future. Featuring a new cast of characters, updated combat, and classic Tales of gameplay mechanics, experience the next chapter in the world-famous Tale of series, Tales of Arise.",
    metacritic: "87",
    image: "https://preview.redd.it/aono7ot72p471.jpg?width=915&format=pjpg&auto=webp&v=enabled&s=6a2b0553d8c8cb58165e45e134dccf5ad6012511",
    video:"https://www.youtube.com/embed/4dhv8In1HQ0",
    genres: "Action-adventure",
    platforms: "Playstation 4, Xbox One, Playstation 5, Xbox Series, Windows PC"
  },
  {
    title: "God of War: Ragnarök",
    release: "Nov 09, 2022 by Sony Interactive Entertainment, SIE Santa Monica Studio",
    description: "God of War: Ragnarök is the ninth installment in the God of War series and the sequel to 2018's God of War. Continuing with the Norse mythology theme, the game is set in ancient Norway and feature series protagonists Kratos, the former Greek God of War, and his young son Atreus. The game is expected to kick off the events of Ragnarök, where Kratos and Atreus must journey to each of the Nine Realms in search of answers as they prepare for the prophesied battle that will end the world.",
    metacritic: "94",
    image: "https://gzhls.at/i/09/97/2380997-l0.jpg",
    video:"https://www.youtube.com/embed/EE-4GvjKcfs",
    genres: "Action-adventure",
    platforms: "Playstation 4, Playstation 5"
  },
  {
    title: "Returnal",
    release: "Apr 30, 2021 by Housemarque, Sony Interactive Entertainment",
    description: "After crash-landing on a shape-shifting alien planet, Selene finds herself fighting tooth and nail for survival. Again and again she’s defeated, forced to restart her journey every time she dies. In this roguelike shooter, both the planet and your equipment change with every cycle, forcing you to adapt your play style and take on evolving challenges.",
    metacritic: "86",
    image: "https://www.gamers-shop.dk/images/game_img/returnal.jpg",
    video:"https://www.youtube.com/embed/Jv4BjWoB-NA",
    genres: "Third-person shooter, Roguelike",
    platforms: "Playstation 5"
  },
  {
    title: "Horizon: Forbidden West",
    release: "Feb 18, 2022 by Guerrilla Games, Sony Interactive Entertainment",
    description: "Horizon Forbidden West continues Aloy’s story as she moves west to a far-future America to brave a majestic, but dangerous frontier where she’ll face awe-inspiring machines and mysterious new threats",
    metacritic: "88",
    image: "https://static-de.gamestop.de/images/products/290451/3max.jpg",
    video:"https://www.youtube.com/embed/Lq594XmpPBg",
    genres: "Action-adventure",
    platforms: "Playstation 4, Playstation 5"
  },
  {
    title: "Devil May Cry 5",
    release: "Mar 08, 2019 by Capcom, Capcom Development Division 1",
    description: "Devil May Cry 5 is a brand-new entry in the legendary over-the-top action series Devil May Cry. The game features three playable characters, each with a radically different stylish combat play style as they take on the city overrun with demons. Developed with Capcom’s in-house proprietary RE engine, the series continues to achieve new heights in fidelity with graphics that utilize photorealistic character designs and stunning lighting and environmental effects.",
    metacritic: "89",
    image: "https://m.media-amazon.com/images/I/91PHJ+3wEfL.jpg",
    video:"https://www.youtube.com/embed/g_2VZvi0fQ0",
    genres: "Action-adventure, Hack and slash",
    platforms: "Playstation 4, Xbox One, Playstation 5, Xbox Series, Windows PC"
  },
  {
    title: "Monster Hunter World",
    release: "Jan 26, 2018 by Capcom",
    description: "Welcome to a new world! Take on the role of a hunter and slay ferocious monsters in a living, breathing ecosystem where you can use the landscape and its diverse inhabitants to get the upper hand. Hunt alone or in co-op with up to three other players, and use materials collected from fallen foes to craft new gear and take on even bigger, badder beasts!",
    metacritic: "90",
    image: "https://gzhls.at/i/89/59/1638959-n0.jpg",
    video:"https://www.youtube.com/embed/Ro6r15wzp2o",
    genres: "Action-adventure",
    platforms: "Playstation 4, Xbox One, Windows PC"
  },
  {
    title: "Ghost of Tsushima",
    release: "Jul 17, 2020 by Sucker Punch Productions, Sony Interactive Entertainment",
    description: "Uncover the hidden wonders of Tsushima in this open-world action adventure. Forge a new path and wage an unconventional war for the freedom of Tsushima. Challenge opponents with your katana, master the bow to eliminate distant threats, develop stealth tactics to ambush enemies in order to win over the mongols.",
    metacritic: "83",
    image: "https://www.gamingdragons.com/images/game_img/Ghost_of_Tsushima_ps5_dc.jpg",
    video:"https://www.youtube.com/embed/iqysmS4lxwQ",
    genres: "Action-adventure",
    platforms: "Playstation 4, Playstation 5"
  },
  {
    title: "Nier: Automata",
    release: "Feb 23, 2017 by PlatinumGames, Square Enix",
    description: "NieR: Automata tells the story of androids 2B, 9S and A2 and their battle to reclaim the machine-driven dystopia overrun by powerful machines.",
    metacritic: "88",
    image: "https://m.media-amazon.com/images/I/81uhSiSLzSL.jpg",
    video:"https://www.youtube.com/embed/wJxNhJ8fjFk",
    genres: "Action-adventure",
    platforms: "Playstation 4, Xbox One, Nintendo Switch, Windows PC"
  },
  {
    title: "Super Mario Odyssey",
    release: "Oct 27, 2017v by Nintendo",
    description: "Explore incredible places far from the Mushroom Kingdom as you join Mario and his new ally Cappy on a massive, globe-trotting 3D adventure. Use amazing new abilities, like the power to capture and control objects, animals, and enemies to collect Power Moons so you can power up the Odyssey airship and save Princess Peach from Bowser’s wedding plans!",
    metacritic: "97",
    image: "https://static-de.gamestop.de/images/products/261473/3max.jpg",
    video: "https://www.youtube.com/embed/5kcdRBHM7kM",
    genres: "Platformer, Action-adventure",
    platforms: "Nintendo Switch"
  },
]

/*
title: ""
release: ""
description: ""
metacritic: ""
image: ""
genres: ""
platforms: ""

title: ""
release: ""
description: ""
metacritic: ""
image: ""
genres: ""
platforms: ""

title: ""
release: ""
description: ""
metacritic: ""
image: ""
genres: ""
platforms: ""

title: ""
release: ""
description: ""
metacritic: ""
image: ""
genres: ""
platforms: ""
*/


mongoose
  .connect(MONGO_URI)
  .then(x => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);
 
   // Something else I wanna create here
   
   Game.create(games)
   .then(data => {

     console.log(`${data.length} games inserted.`)
     mongoose.connection.close()
    }).catch((err) => {
     console.error("Error creating games: ", err);
    });
   
    User.create(users)
    .then(data => {

      console.log(`${data.length} users inserted.`)
      mongoose.connection.close()
    }).catch((err) => {
      console.error("Error creating products: ", err);
    });

  })
  .catch((err) => {
    console.error("Error connecting to Mongo ", err);
  });