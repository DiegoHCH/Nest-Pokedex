import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  async executeSeed() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const data: PokeResponse = await response.json();

    data.results.map(({name, url}) => {
      const no = +url.split('/').at(-2);
      console.log(name, no) ;
    })
    
    return data.results;
  }

}
