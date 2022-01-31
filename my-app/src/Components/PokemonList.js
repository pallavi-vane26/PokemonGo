import React from 'react';
import SearchBar from './SearchBar';
import FilterComponent from './FilterComponent';
import Multiselect from 'multiselect-react-dropdown';

class PokemonList extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded: false,
            searchQuery: "",
            weakneses: [],
            selectedValue: "",
            selectedTypeValue: "",
            selectedWeakness: "",
            selectedType: ""
        };
    }
    componentDidMount() {
        fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json.pokemon,
                    DataisLoaded: true,
                    //weakneses : json.pokemon.filter(function(item, i, ar){ return ar.indexOf(item.weakneses) === i; }),
                    //type: json.pokemon.filter(function(item, i, ar){ return ar.indexOf(item) === i; })

                });
            })
    }
    setSearchQuery = (input) => {
        this.setState({
          searchQuery: input
        });
    }

    onSelect = (selectedList, selectedItem) => {
        let newList = [];
        if(selectedItem){
            newList = this.state.items && this.state.items.filter(el => {
                return el.weaknesses.includes(selectedItem.name);
            })
        }
        this.setState({
          items: newList
        });
    }
    onRemove = (selectedList, removedItem) => {
    }
    onTypeSelect = (selectedList, selectedItem) => {
        let newList = [];
        if(selectedItem){
            newList = this.state.items && this.state.items.filter(el => {
                return el.type.includes(selectedItem.name);
            })
        }
        this.setState({
          items: newList
        });
    }
    onTypeRemove = (selectedList, removedItem) => {

    }

    render() {
        const { DataisLoaded, items, searchQuery, selectedValue, selectedTypeValue, selectedWeakness, selectedType } = this.state;
        let weaknessesArr = [];
        let typeArr = [];
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;


        let filteredData = items.filter((el) => {
            if (searchQuery === '') {
                return el;
            }
            else {
                return el.name.toLowerCase().includes(searchQuery);
            }
        })


        filteredData && filteredData.map(item => {
            item.weaknesses.map(el => {
              weaknessesArr = [...weaknessesArr, el];
            })
        })
        let uniqueWeaknesses = [...new Set(weaknessesArr)].map((item, i) => {
            return {name : item, id: i}
        });
        filteredData && filteredData.map(item => {
            item.type.map(el => {
              typeArr = [...typeArr, el];
            })
        })
        let uniqueTypes = [...new Set(typeArr)].map((item, i) => {
            return {name : item, id: i}
        });
        return (
          <div className = "pokemon">
                <SearchBar searchQuery={searchQuery} setSearchQuery= {this.setSearchQuery}/>
                <Multiselect
                    options={uniqueWeaknesses}
                    selectedValues={selectedValue}
                    onSelect={this.onSelect}
                    onRemove={this.onRemove}
                    displayValue="name"
                    />
                <Multiselect
                    options={uniqueTypes}
                    selectedValues={selectedTypeValue}
                    onSelect={this.onTypeSelect}
                    onRemove={this.onTypeRemove}
                    displayValue="name"
                    />
                <ul>
                  {filteredData && filteredData.map(item => (
                    <ol key = { item.id } >
                        Name: { item.name },
                        num: { item.num },
                        weaknesses: { item.weaknesses }
                        type: { item.type }
                        </ol>
                  ))}
                </ul>
              </div>
          );
      }
}
export default PokemonList;
