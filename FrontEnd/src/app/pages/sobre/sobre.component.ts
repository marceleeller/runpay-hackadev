import { Component } from '@angular/core';
import { HeaderHomeComponent } from "../../components/header-home/header-home.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CardEquipeComponent } from '../../components/card-equipe/card-equipe.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sobre',
    standalone: true,
    templateUrl: './sobre.component.html',
    styleUrl: './sobre.component.css',
    imports: [HeaderHomeComponent, FooterComponent, CardEquipeComponent, CommonModule]
})
export class SobreComponent {


  equipe:any[] = [

    {
      img:"../../../assets/marcele.png",
      nome:"Marcele",
      funcao:"Monitora",
      redesSociais: [
        {
          plataforma: "Github",
          link: "https://github.com/marceleeller"
        },
        {
          plataforma: "Linkedin",
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
          plataforma: "Github",
          link: "https://github.com/grasieletinoco"
        },
        {
          plataforma: "Linkedin",
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
          plataforma: "Github",
          link: "https://github.com/isadeop"
        },
        {
          plataforma: "Linkedin",
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
          plataforma: "Github",
          link: "https://github.com/JaquelineAPSantos"
        },
        {
          plataforma: "Linkedin",
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
          plataforma: "Github",
          link: "https://github.com/PAKell"
        },
        {
          plataforma: "Linkedin",
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
          plataforma: "Github",
          link: "https://github.com/ErickFPrado"
        },
        {
          plataforma: "Linkedin",
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
          plataforma: "Github",
          link: "https://github.com/giperuzzo"
        },
        {
          plataforma: "Linkedin",
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
          plataforma: "Github",
          link: "https://github.com/Antoniobarrosdecastro"
        },
        {
          link: "https://www.linkedin.com"
        }
      ]
    },

  ]
}
