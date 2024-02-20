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
      nome:"Marcele Eller",
      funcao:"Monitora",
      redesSociais: [
        {
          plataforma: "../../../assets/github_icon.svg",
          link: "https://github.com/marceleeller"
        },
        {
          plataforma: "../../../assets/linkedin_icon.svg",
          link: "https://www.linkedin.com/in/marceleeller"
        }
      ]
    },

    {
      img:"../../../assets/grasiele.png",
      nome:"Grasiele Tinoco",
      funcao:"Vice-Monitora",
      redesSociais: [
        {
          plataforma: "../../../assets/github_icon.svg",
          link: "https://github.com/grasieletinoco"
        },
        {
          plataforma: "../../../assets/linkedin_icon.svg",
          link: "https://www.linkedin.com/in/grasieletinoco"
        }
      ]
    },


    {
      img:"../../../assets/isa.png",
      nome:"Isadora de Oliveira",
      funcao:"Desenvolvedora",
      redesSociais: [
        {
          plataforma: "../../../assets/github_icon.svg",
          link: "https://github.com/isadeop"
        },
        {
          plataforma: "../../../assets/linkedin_icon.svg",
          link: "https://www.linkedin.com/in/isadoradeoliveirapinto"
        }
      ]
    },


    {
      img:"../../../assets/jaqueline.png",
      nome:"Jaqueline Santos",
      funcao:"Desenvolvedora",
      redesSociais: [
        {
          plataforma: "../../../assets/github_icon.svg",
          link: "https://github.com/JaquelineAPSantos"
        },
        {
          plataforma: "../../../assets/linkedin_icon.svg",
          link: "https://www.linkedin.com/in/jaquelineapsantos"
        }
      ]
    },


    {
      img:"../../../assets/kelly.png",
      nome:"Kelly Pedroso",
      funcao:"Desenvolvedora",
      redesSociais: [
        {
          plataforma: "../../../assets/github_icon.svg",
          link: "https://github.com/PAKell"
        },
        {
          plataforma: "../../../assets/linkedin_icon.svg",
          link: "https://www.linkedin.com/in/kelly-pedroso-11330790"
        }
      ]
    },


    {
      img:"../../../assets/erick.png",
      nome:"Erick Prado",
      funcao:"Desenvolvedor",
      redesSociais: [
        {
          plataforma: "../../../assets/github_icon.svg",
          link: "https://github.com/ErickFPrado"
        },
        {
          plataforma: "../../../assets/linkedin_icon.svg",
          link: "https://www.linkedin.com/in/erick-prado-5b3533258"
        }
      ]
    },


    {
      img:"../../../assets/gislene.png",
      nome:"Gislene Peruzzo",
      funcao:"Desenvolvedora",
      redesSociais: [
        {
          plataforma: "../../../assets/github_icon.svg",
          link: "https://github.com/giperuzzo"
        },
        {
          plataforma: "../../../assets/linkedin_icon.svg",
          link: "https://www.linkedin.com/in/gisleneperuzzo"
        }
      ]
    },


    {
      img:"../../../assets/antonio.png",
      nome:"Antonio de Castro",
      funcao:"Desenvolvedor",
      redesSociais: [
        {
          plataforma: "../../../assets/github_icon.svg",
          link: "https://github.com/Antoniobarrosdecastro"
        },
        {
          plataforma: "../../../assets/linkedin_icon.svg",
          link: "https://www.linkedin.com"
        }
      ]
    },

  ]

}
