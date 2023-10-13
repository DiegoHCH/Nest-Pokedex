import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon>
  ){}

  async executeSeed() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const data: PokeResponse = await response.json();

    data.results.map(async ({name, url}) => {
      const no = +url.split('/').at(-2);
      const pokemon = await this.pokemonModel.create({name, no});
    })
    
    return 'Seed Execute Succesfully';
  }

}
