import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card-equipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-equipe.component.html',
  styleUrl: './card-equipe.component.css'
})
export class CardEquipeComponent {

  title = 'Equipe';



  equipe:any[] = [

    {
      img:"../../../assets/marcele.png",
      nome:"Marcele",
      funcao:"Monitora",
      redesSociais: [
        {
          plataforma: "GitHub",
          link: "https://github.com/marceleeller"
        },
        {
          plataforma: "GitHub",
          link: "https://www.linkedin.com/in/marceleeller"
        }
      ]
    },

    {
      img:"../../../assets/grasiele.png",
      nome:"Grasiele",
      funcao:"Vice-Monitora",
      redesSociais: [
        {
          plataforma: "GitHub",
          link: "https://github.com/grasieletinoco"
        },
        {
          plataforma: "LinkedIn",
          link: "https://www.linkedin.com/in/grasieletinoco"
        }
      ]
    },


    {
      img:"../../../assets/isa.png",
      nome:"Isadora",
      funcao:"Desenvolvedora",
      redesSociais: [
        {
          plataforma: "GitHub",
          link: "https://github.com/isadeop"
        },
        {
          plataforma: "LinkedIn",
          link: "https://www.linkedin.com/in/isadoradeoliveirapinto"
        }
      ]
    },


    {
      img:"../../../assets/jaqueline.png",
      nome:"Jaqueline",
      funcao:"Desenvolvedora",
      redesSociais: [
        {
          plataforma: "GitHub",
          link: "https://github.com/JaquelineAPSantos"
        },
        {
          plataforma: "LinkedIn",
          link: "https://www.linkedin.com/in/jaquelineapsantos"
        }
      ]
    },


    {
      img:"../../../assets/kelly.png",
      nome:"Kelly",
      funcao:"Desenvolvedora",
      redesSociais: [
        {
          plataforma: "GitHub",
          link: "https://github.com/PAKell"
        },
        {
          plataforma: "LinkedIn",
          link: "https://www.linkedin.com/in/kelly-pedroso-11330790"
        }
      ]
    },


    {
      img:"../../../assets/erick.png",
      nome:"Erick",
      funcao:"Desenvolvedor",
      redesSociais: [
        {
          plataforma: "GitHub",
          link: "https://github.com/ErickFPrado"
        },
        {
          plataforma: "LinkedIn",
          link: "https://www.linkedin.com/in/erick-prado-5b3533258"
        }
      ]
    },


    {
      img:"../../../assets/gislene.png",
      nome:"Gislene",
      funcao:"Desenvolvedora",
      redesSociais: [
        {
          plataforma: "GitHub",
          link: "https://github.com/giperuzzo"
        },
        {
          plataforma: "LinkedIn",
          link: "https://www.linkedin.com/in/gisleneperuzzo"
        }
      ]
    },


    {
      img:"../../../assets/antonio.png",
      nome:"Antonio",
      funcao:"Desenvolvedor",
      redesSociais: [
        {
          plataforma: "GitHub",
          link: "https://github.com/Antoniobarrosdecastro"
        },
        {
          link: "https://www.linkedin.com"
        }
      ]
    },

  ]

}
