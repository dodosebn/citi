export const CompilingNames = [
  "Sofia Morales",
  "Diego Fernandez",
  "Lucia Ramirez",
  "Mateo Sanchez",
  "Camila Torres",
  "Javier Delgado",
  "Valentina Gomez",
  "Carlos Rodriguez",
  "Santiago Martinez",
  "Gabriela Lopez",
  "Hiroshi Tanaka",
  "Yuki Nakamura",
  "Sakura Fujimoto",
  "Kenji Yamamoto",
  "Akira Sato",
  "Hana Kobayashi",
  "Mei Li",
  "Liang Zhang",
  "Xiao Chen",
  "Hao Wu",
  "Chen Wei",
  "Xia Huang",
  "Aria Johnson",
  "Liam Smith",
  "Olivia Brown",
  "Ethan Davis",
  "Isabella Miller",
  "Mason Wilson",
  "Aiden Thompson",
  "Emma White",
  "Noah Anderson",
  "Sophia Taylor",
  "Lucas Harris",
  "Mia Martin",
  "Elena Ruiz",
  "Diego Morales",
  "Joaquin Perez",
  "Yara Torres",
  "Ken Yamamoto",
  "Suki Nishimura",
  "Taro Suzuki",
  "Ling Zhao",
  "Jing Xu",
  "Min Lee",
  "Chun Wang",
  "Nathan Clark",
  "Grace Hall",
  "Chloe Adams",
  "Evelyn Baker",
  "Julian Rivera",
  "Natalia Castillo"
];

function randomAmount() {
  if (Math.random() < 0.1) {
    return Math.floor(Math.random() * 1_000_000) + 1; 
  } else {
    return Math.floor(Math.random() * 9_000) + 1_000; 
  }
}

export const NamesWithAmount = CompilingNames.map(name => ({
  name,
  amount: randomAmount()
}));

console.log(NamesWithAmount);
