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

    await this.pokemonModel.deleteMany({});

    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=650");
    const data: PokeResponse = await response.json();

    const pokemonToInsert: {name:string, no: number}[] = [];

    data.results.map(({name, url}) => {
      const no = +url.split('/').at(-2);
      //const pokemon = await this.pokemonModel.create({name, no});
      pokemonToInsert.push({name, no});
    })

    await this.pokemonModel.insertMany(pokemonToInsert);
    
    return 'Seed Execute Succesfully';
  }

}
