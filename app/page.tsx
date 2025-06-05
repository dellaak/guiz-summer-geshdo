"use client";

import { useState,useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trophy, TreePalm as PalmTree, SunMedium } from "lucide-react";

interface Team {
  name: string;
  score: number;
}

interface Question {
  id: string;
  category: string;
  text: string;
  points: number;
  isAnswered: boolean;
  img?: string;
  imgs?:string[]
}

enum categoryEnums{
  food = "Mat och Dryck",
  Disney ="Disney",
  Pokemon = "Pokémon",
  WhosThere ="Vem där?",
  Random ="Random"
}



const questions: Question[] = [
  {
    id: "1",
    category: categoryEnums.food,
    text: "Vilken frukt har sina frön på utsidan istället för insidan?",
    points: 100,
    isAnswered: false,
  },
  {
    id: "2",
    category: categoryEnums.food,
    text: "Svenskens favoritsås när det ska grillas är bearnaisås. Vad är huvudingrediensen i bearnaisås?",
    points: 100,
    isAnswered: false,
  },
   {
    id: "3",
    category: categoryEnums.food,
    text: "Det heter att man ska knåda degen tills den blir smidig. Men vad är det egentligen man försöker uppnå genom denna metod?",
    points: 100,
    isAnswered: false,
  },
   {
    id: "4",
    category: categoryEnums.food,
    text: "Vilket livsmedel består till nästan 100 % av socker men anses ibland som 'naturligt'?",
    points: 100,
    isAnswered: false,
  },
    {
    id: "5",
    category: categoryEnums.food,
    text: "Vad heter kaffet som görs av bönor som passerat genom ett djurs matsmältningssystem?",
    points: 100,
    isAnswered: false,
  },
     {
    id: "6",
    category: categoryEnums.food,
    text: "Vilken alkoholdryck görs traditionellt genom att jäsa ris?",
    points: 100,
    isAnswered: false,
  },
     {
    id: "7",
    category: categoryEnums.food,
    text: "Vilken alkoholdryck görs traditionellt genom att jäsa ris?",
    points: 100,
    isAnswered: false,
  },
       {
    id: "mat1",
    category: categoryEnums.food,
    text: "Vad heter osten?",
    points: 100,
   img: "./bilder/ost1.jpeg", 
    isAnswered: false,
  },
  
      {
    id: "d1",
    category: categoryEnums.Disney,
    text: "Vems hår är detta?",
    img: "./bilder/d1.jpg", 
    points: 100,
    isAnswered: false,
  },
      {
    id: "d2",
    category: categoryEnums.Disney,
    text: "Vems hår är detta?",
    img: "./bilder/d2.jpg", 
    points: 100,
    isAnswered: false,
  },
        {
    id: "d3",
    category: categoryEnums.Disney,
    text: "Från vilken film kommer quoten ifrån ?",
    img: "https://slideplayer.com/12975033/79/images/slide_1.jpg", 
    points: 100,
    isAnswered: false,
  },
        {
    id: "d4",
    category: categoryEnums.Disney,
    text: "Vem var den först disney princessan?",
    points: 100,
    isAnswered: false,
  },
     {
    id: "9",
    category: categoryEnums.Pokemon,
    text: "Gissa pokemon",
    img: "./bilder/p1.jpg", 
    points: 100,
    isAnswered: false,
  },
     {
    id: "10",
    category: categoryEnums.Pokemon,
    text: "Gissa pokemon",
    img: "./bilder/p2.jpg", 
    points: 100,
    isAnswered: false,
  },
       {
    id: "11",
    category: categoryEnums.Pokemon,
    text: "Gissa pokemon",
    img: "./bilder/p3.jpg", 
    points: 100,
    isAnswered: false,
  },
      {
    id: "12",
    category: categoryEnums.Pokemon,
    text: "Gissa pokemon",
    img: "./bilder/p4.jpg", 
    points: 100,
    isAnswered: false,
  },
     {
    id: "13",
    category: categoryEnums.Pokemon,
    text: "Gissa pokemon",
    img: "./bilder/p5.png", 
    points: 100,
    isAnswered: false,
  },
   {
    id: "14",
    category: categoryEnums.Pokemon,
    text: "Gissa pokemon",
    img: "./bilder/p6.jpg", 
    points: 100,
    isAnswered: false,
  },
   {
    id: "v1",
    category: categoryEnums.WhosThere,
    text: "Vem är detta?",
    imgs: ["./bilder/vd1.png", "./bilder/vd2.png","./bilder/vd3.png"], 
    points: 100,
    isAnswered: false,
  },
   {
    id: "t1",
    category: categoryEnums.WhosThere,
    text: "Vem är detta?",
    imgs: ["./bilder/t1.png", "./bilder/t2.png","./bilder/t3.png"], 
    points: 100,
    isAnswered: false,
  },
     {
    id: "ran1",
    category: categoryEnums.Random,
    text: "Hur många ben har en hummer?",
    points: 100,
    isAnswered: false,
  },
       {
    id: "ran2",
    category: categoryEnums.Random,
    text: " Vilket år lanserades den första webbläsaren?",
    points: 100,
    isAnswered: false,
  },
  
         {
    id: "ran3",
    category: categoryEnums.Random,
    text: " Vad är detta för djur?",
    img:"./bilder/ran2.jpg",
    points: 100,
    isAnswered: false,
  },
           {
    id: "ran4",
    category: categoryEnums.Random,
    text: " Vad heter templet?",
    img:"https://static-cdn.sr.se/images/5053/d023330b-5e97-4234-aff4-8bb268f2b74f.jpg",
    points: 100,
    isAnswered: false,
  },
 

];

export default function Home() {
  const [questionsState, setQuestionsState] = useState<Question[]>(() => {
  const saved = localStorage?.getItem("quiz_questions");
  return saved ? JSON.parse(saved) : questions;
});

const [teams, setTeams] = useState<Team[]>(() => {
  const saved = localStorage?.getItem("quiz_teams");
  return saved ? JSON.parse(saved) : [];
});
  const [newTeamName, setNewTeamName] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string>("");


  useEffect(() => {
    const savedTeams = localStorage.getItem("quiz_teams");
    const savedQuestions = localStorage.getItem("quiz_questions");

    if (savedTeams) {
      setTeams(JSON.parse(savedTeams));
    }

    if (savedQuestions) {
      setQuestionsState(JSON.parse(savedQuestions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quiz_teams", JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem("quiz_questions", JSON.stringify(questionsState));
  }, [questionsState]);


  const addTeam = () => {
    if (newTeamName.trim() && !teams.find(team => team.name === newTeamName)) {
      setTeams([...teams, { name: newTeamName, score: 0 }]);
      setNewTeamName("");
    }
  };

  const awardPoints = () => {
    if (selectedTeam && selectedQuestion) {
      setTeams(teams.map(team => 
        team.name === selectedTeam 
          ? { ...team, score: team.score + selectedQuestion.points }
          : team
      ));
     setQuestionsState(prev =>
  prev.map(q =>
    q.id === selectedQuestion.id
      ? { ...q, isAnswered: true }
      : q
  )
);
      setSelectedQuestion(null);
      setSelectedTeam("");
    }
  };

  const categories = Array.from(new Set(questions.map(q => q.category)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-blue-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 flex items-center justify-center gap-3 mb-2">
            <PalmTree className="h-8 w-8" />
            Summer Party Quiz
            <SunMedium className="h-8 w-8 text-yellow-500" />
          </h1>
          
          <div className="flex gap-4 justify-center mb-8">
            <Input
              placeholder="Enter team name"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              className="max-w-xs"
            />
            <Button onClick={addTeam} variant="default">
              Add Team
            </Button>
          </div>

          {teams.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {teams.sort((a, b) => b.score - a.score).map((team) => (
                <Card key={team.name} className="p-4 text-center bg-white/80 backdrop-blur">
                  <div className="font-semibold">{team.name}</div>
                  <div className="text-2xl font-bold text-blue-600">{team.score}</div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-8">
          {categories.map(category => (
            <div key={category}>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">{category}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {questionsState
                  .filter(q => q.category === category)
                  .map((question,index) => (
                   <Card
                   
  key={question.id}
  onClick={() => {
    if (!question.isAnswered) {
      const audio = new Audio("/letsPlay.mp3");
      audio.play();
      setSelectedQuestion(prev =>
        prev?.id === question.id ? null : question
      );
    }
  }}
  className={`p-6 cursor-pointer transition-all hover:scale-105 ${
    question.isAnswered
      ? "bg-blue-100"
      : selectedQuestion?.id === question.id
        ? "bg-yellow-100"
        : "bg-white hover:shadow-lg"
  }`}
>
  <div className="text-2xl font-bold text-blue-600 mb-2">
   Fråga {index +1 }
  </div>

  {(selectedQuestion?.id === question.id || question.isAnswered) && (
    <div className="space-y-4">
      <p className="text-sm">{question.text}</p>
     {question.isAnswered && <p className="text-sm italic text-green-700">
       Poäng tilldelad
      </p>}

<div style={{display:'flex',flexDirection:"column"}}>

        {question.imgs && question.imgs.map((item,index)=>{
          
          return <a href={item} target="_blank"  style={{marginBottom:"10px",color:"blue"}} onClick={(e) => {
            e.stopPropagation();
            
          }}>
          Link to image {index +1}
            </a>
        })}
        </div>

      {question.img && <a href={question.img} target="_blank"  onClick={(e) => {
              e.stopPropagation();
           
            }}>
              Länk till bild
            </a>}

      {!question.isAnswered && (
        <>
          <select
            className="w-full p-2 border rounded"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="">Select Team</option>
            {teams.map(team => (
              <option key={team.name} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              awardPoints();
            }}
            disabled={!selectedTeam}
            className="w-full"
          >
            Award Points
          </Button>
        </>
      )}
    </div>
  )}
</Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}