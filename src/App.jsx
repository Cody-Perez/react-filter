import React, { useEffect, useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Range, useThumbOverlap, getTrackBackground } from 'react-range';
// import images for vehicles
import wagon from './assets/img/wagon.png';
import vans from './assets/img/vans.png';
import utes from './assets/img/utes.png';
import sedans from './assets/img/sedans.png';
import motorcycles from './assets/img/motorcycles.png';
import mine_spec from './assets/img/mine_spec.png';
import hybrids from './assets/img/hybrids.png';
import hatchbacks from './assets/img/hatchbacks.png';
import dual_cab from './assets/img/dual_cab.png';
import coupes from './assets/img/coupes.png';
import convertibles from './assets/img/convertibles.png';
import commercial from './assets/img/commercial.png';
import boats from './assets/img/boats.png';
import awds from './assets/img/awds.png';
import seaters from './assets/img/7seaters.png';
import wds from './assets/img/4wds.png';
import Data from './service/Data.json';


// custom React-Range Slider Initial settings
const COLORS = ['#d8d8d8', '#000000', '#d8d8d8', '#ccc'];
const THUMB_SIZE = 30;

// Year Slider ThumbLabel setting
const ThumbLabel = ({
    rangeRef,
    values,
    index,
}) => {
    const [labelValue, labelStyle] = useThumbOverlap(
        rangeRef,
        values,
        index,
        1,
        ' - ',
        (value) => `${value}`
    );
    return (
        <div
            data-label={index}
            style={{
                display: 'block',
                position: 'absolute',
                top: '-38px',
                color: 'black',
                fontWeight: '300',
                fontSize: '19px',
                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                padding: '4px',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                ...labelStyle
            }}
        >
            {labelValue}
        </div>
    );
};
// Price Slider ThumbLabel setting
const PriceThumbLabel = ({
    rangeRef,
    values,
    index,
}) => {
    const [labelValue, labelStyle] = useThumbOverlap(
        rangeRef,
        values,
        index,
        1,
        ' - ',
        (value) => `$${value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
    );
    return (
        <div
            data-label={index}
            style={{
                display: 'block',
                position: 'absolute',
                top: '-38px',
                color: 'black',
                fontWeight: '300',
                fontSize: '19px',
                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                padding: '4px',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                ...labelStyle
            }}
        >
            {labelValue}
        </div>
    );
};
// Odometer Slider ThumbLabel setting
const OdometerThumbLabel = ({
    rangeRef,
    values,
    index,
}) => {
    const [labelValue, labelStyle] = useThumbOverlap(
        rangeRef,
        values,
        index,
        1,
        ' - ',
        (value) => `${value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}km`
    );
    return (
        <div
            data-label={index}
            style={{
                display: 'block',
                position: 'absolute',
                top: '-38px',
                color: 'black',
                fontWeight: '300',
                fontSize: '19px',
                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                padding: '4px',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                ...labelStyle
            }}
        >
            {labelValue}
        </div>
    );
};
// sliders global style setting
const useStyles = makeStyles((theme) => ({
    odometerMargin: {
        height: theme.spacing(3),
        width: '70%',
        marginLeft: '50px',
        marginTop: '35px',
        marginBottom: '20px'
    },
    margin: {
        height: '100%',
        width: '70%',
        marginLeft: '40px',
        marginTop: '35px',
    },
}));


function App() {
    // custom React-Range initial Settings
    // Year slider Ref, Thumb and track line setting
    const [rangeRef, setRangeRef] = useState(React.useRef());
    const Thumb = ({ props, index, isDragged }) => (
        <div
            {...props}
            style={{
                ...props.style,
                height: `${THUMB_SIZE}px`,
                width: `${THUMB_SIZE}px`,
                borderRadius: '50%',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #AAA',
                outline: 'none',
                border: '1px solid black'
            }}
        >
            <ThumbLabel
                rangeRef={rangeRef.current}
                values={yearValue}
                index={index}
            />
            <div
                style={{
                    height: '16px',
                    width: '5px',
                    backgroundColor: isDragged ? '#548BF4' : '#CCC'
                }}
            />
        </div>
    );
    const Track = ({ props, children }) => (
        <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
                ...props.style,
                height: '36px',
                display: 'flex',
                width: '100%'
            }}
        >
            <div
                ref={props.ref}
                style={{
                    height: '3px',
                    width: '100%',
                    borderRadius: '4px',
                    background: getTrackBackground({
                        values: yearValue,
                        colors: COLORS,
                        min: minYear,
                        max: maxYear
                    }),
                    alignSelf: 'center'
                }}
            >
                {children}
            </div>
        </div>
    );
    // Price slider Ref, Thumb and track line setting
    const [priceRangeRef, setPriceRangeRef] = useState(React.useRef());
    const PriceThumb = ({ props, index, isDragged }) => (
        <div
            {...props}
            style={{
                ...props.style,
                height: `${THUMB_SIZE}px`,
                width: `${THUMB_SIZE}px`,
                borderRadius: '50%',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #AAA',
                outline: 'none',
                border: '1px solid black'
            }}
        >
            <PriceThumbLabel
                rangeRef={priceRangeRef.current}
                values={value}
                index={index}
            />
            <div
                style={{
                    height: '16px',
                    width: '5px',
                    backgroundColor: isDragged ? '#548BF4' : '#CCC'
                }}
            />
        </div>
    );
    const PriceTrack = ({ props, children }) => (
        <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
                ...props.style,
                height: '36px',
                display: 'flex',
                width: '100%'
            }}
        >
            <div
                ref={props.ref}
                style={{
                    height: '3px',
                    width: '100%',
                    borderRadius: '4px',
                    background: getTrackBackground({
                        values: value,
                        colors: COLORS,
                        min: min,
                        max: max
                    }),
                    alignSelf: 'center'
                }}
            >
                {children}
            </div>
        </div>
    );
    // Odometer slider Ref, Thumb and track line setting
    const [odometerRangeRef, setOdometerRangeRef] = useState(React.useRef());
    const OdometerThumb = ({ props, index, isDragged }) => (
        <div
            {...props}
            style={{
                ...props.style,
                height: `${THUMB_SIZE}px`,
                width: `${THUMB_SIZE}px`,
                borderRadius: '50%',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #AAA',
                outline: 'none',
                border: '1px solid black'
            }}
        >
            <OdometerThumbLabel
                rangeRef={odometerRangeRef.current}
                values={valueOdometer}
                index={index}
            />
            <div
                style={{
                    height: '16px',
                    width: '5px',
                    backgroundColor: isDragged ? '#548BF4' : '#CCC'
                }}
            />
        </div>
    );
    const OdometerTrack = ({ props, children }) => (
        <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
                ...props.style,
                height: '36px',
                display: 'flex',
                width: '100%'
            }}
        >
            <div
                ref={props.ref}
                style={{
                    height: '3px',
                    width: '100%',
                    borderRadius: '4px',
                    background: getTrackBackground({
                        values: valueOdometer,
                        colors: COLORS,
                        min: minOdometer,
                        max: maxOdometer
                    }),
                    alignSelf: 'center'
                }}
            >
                {children}
            </div>
        </div>
    );


    // define advanced check variable to switch the advanced search Dom.
    const [advancedSearchCheck, setAdvancedSearchCheck] = useState(false); // have to be initiated when start
    // price values
    const [max, setMax] = useState(1000); // have to be initiated when start
    const [min, setMin] = useState(0); // have to be initiated when start
    const [value, setValue] = useState([0, 1000]); // have to be initiated when start
    // year values
    const [minYear, setMinYear] = useState(0); // have to be initiated when start
    const [maxYear, setMaxYear] = useState(1000); // have to be initiated when start
    const [yearValue, setYearValue] = useState([0, 1000]); // have to be initiated when start

    // odometer values
    const [minOdometer, setMinOdometer] = useState(0); // have to be initiated when start
    const [maxOdometer, setMaxOdometer] = useState(1000); // have to be initiated when start
    const [valueOdometer, setValueOdometer] = useState([0, 1000]); // have to be initiated when start
    // make, model, badge select list Dom values
    const [make, setMake] = useState([]);
    const [model, setModel] = useState('');
    const [badge, setBadge] = useState('');
    // make, model, badge values is currently selected
    const [makeValueInSelect, setMakeValueInSelect] = useState('');
    const [modelValueInSelect, setModelValueInSelect] = useState('');
    const [badgeValueInSelect, setBadgeValueInSelect] = useState('');
    // search results
    const [searchResults, setSearchResults] = useState('');
    const [categoryLists, setCategoryLists] = useState('');
    // advanced search select list Dom values
    const [advancedSelectDomLists, setAdvancedSelectDomLists] = useState([]);
    // advanced search select values are currently selectd
    const [advancedValueInSelect, setAdvancedValueInSelect] = useState('');
    // keywords search values
    const [keywords, setKeywords] = useState('');
    // define checked variable for category
    const [checkClickedCategory, setCheckClickedCategory] = useState({
        clicked: false,
        param: ''
    });
    // defined the class for Airbnb React Material Slider
    const classes = useStyles();

    // lifeCycle function definition
    useEffect(() => {

        // get make field Dom lists
        setMake(getFieldLists('make'));
        // get advanced search select field Dom lists
        setAdvancedSelectDomLists({
            transmission: getAdvancedSelectDomLists('transmission'),
            fuelType: getAdvancedSelectDomLists('fuelType'),
            colour: getAdvancedSelectDomLists('colour'),
            body: getAdvancedSelectDomLists('body'),
            engineSize: getAdvancedSelectDomLists('engineSize'),
        });
        console.log(makeValueInSelect, modelValueInSelect, badgeValueInSelect, advancedValueInSelect, keywords, checkClickedCategory);

        // search the vehicles when every select tag(Basic Tags: Make, Model, Badge and Advanced Tags: Transmission, FuelType...) is changed
        let searchTempResults = multipleValueSearch(makeValueInSelect, modelValueInSelect, badgeValueInSelect, '', '', '', advancedValueInSelect, keywords, checkClickedCategory);

        setSearchResults(searchTempResults);
        // classify the categorys
        let classifiedTempResults = classifyCategory(searchTempResults);
        setCategoryLists(classifiedTempResults);
        // get max min price for current Data Results
        let maxMinPriceTemp = maxMinPrice(searchTempResults);
        setMax(maxMinPriceTemp.max);
        setMin(maxMinPriceTemp.min);
        //get max min Year for current Data Results
        let maxMinYearTemp = maxMinYear(searchTempResults);
        setMaxYear(maxMinYearTemp.max);
        setMinYear(maxMinYearTemp.min);
        //get max min odometer for current Data Results
        let maxMinOdometerTemp = maxMinOdometer(searchTempResults);
        setMaxOdometer(maxMinOdometerTemp.max);
        setMinOdometer(maxMinOdometerTemp.min);
        // set current slider value for price and year
        setValue([min, max]);
        setYearValue([minYear, maxYear]);
        setValueOdometer([minOdometer, maxOdometer]);
    },
        [
            makeValueInSelect,
            modelValueInSelect,
            badgeValueInSelect,
            min,
            max,
            minYear,
            maxYear,
            minOdometer,
            maxOdometer,
            advancedValueInSelect,
            keywords,
            checkClickedCategory,
        ]);

    // this is for reset
    const handleReset = () => {
        setAdvancedSearchCheck(false);
        setMax(1000);
        setMin(0);
        setValue([0, 1000]);
        setMinYear(0);
        setMaxYear(1000);
        setYearValue([0, 1000]);
        setMinOdometer(0);
        setMaxOdometer(1000);
        setValueOdometer([0, 1000]);
        setMake([]);
        setModel('');
        setBadge('');
        setMakeValueInSelect('');
        setModelValueInSelect('');
        setBadgeValueInSelect('');
        setSearchResults('');
        setCategoryLists('');
        setAdvancedSelectDomLists([]);
        setAdvancedValueInSelect('');
        setKeywords('');
        setCheckClickedCategory({
            clicked: false,
            param: ''
        })
    }
    // get the maximum and minimum price 
    const maxMinPrice = (data) => {
        let result = {
            max: 0,
            min: 0
        };
        let temp = [];
        for (let i = 0; i < data.length; i++) {
            temp.push(data[i].price);
        }

        result = {
            max: Math.max(...temp),
            min: Math.min(...temp)
        }
        return result;
    }
    // get the maximum and minimum year
    const maxMinYear = (data) => {
        let result = {
            max: 0,
            min: 0
        };
        let temp = [];
        for (let i = 0; i < data.length; i++) {
            temp.push(data[i].year);
        }

        result = {
            max: Math.max(...temp),
            min: Math.min(...temp)
        }
        return result;
    }
    // get the maximum and minimum Odometer
    const maxMinOdometer = (data) => {
        let result = {
            max: 0,
            min: 0
        };
        let temp = [];
        for (let i = 0; i < data.length; i++) {
            // push only for digit values
            if (/^\d+$/.test(data[i].kms)) {
                temp.push(data[i].kms);
            }
        }
        result = {
            max: Math.max(...temp),
            min: Math.min(...temp)
        }
        return result;
    }
    // search by multiple value (Main Search Function)
    const multipleValueSearch = (make_val, model_val, badge_val, price_val, year_val, odometer_val, advanced_val, keywords_val, checkClickedCategory_val) => {

        let filteredValueYear = [];
        let filteredValuePrice = [];
        let filteredValueOdometer = [];
        // when the array value is reverted, convert the array.
        if (price_val) {
            if (year_val[0] > year_val[1]) {
                filteredValueYear[0] = year_val[1];
                filteredValueYear[1] = year_val[0];
                year_val = filteredValueYear;
            }

            if (price_val[0] > price_val[1]) {
                filteredValuePrice[0] = price_val[1];
                filteredValuePrice[1] = price_val[0];
                price_val = filteredValuePrice;
            }

            if (odometer_val[0] > odometer_val[1]) {
                filteredValueOdometer[0] = odometer_val[1];
                filteredValueOdometer[1] = odometer_val[0];
                odometer_val = filteredValueOdometer;
            }
        }


        let results = [];
        if (checkClickedCategory_val.clicked == true) {
            console.log("clicked Category Param", checkClickedCategory_val.param)
            // get the arrays that body in Data.json == clicked category param
            let tempResultsByClickedCategory = oneValueSearch('body', checkClickedCategory_val.param);
            // get the make list of clicked category arrays
            let makeListsResults = [];
            for (let i = 0; i < tempResultsByClickedCategory.length; i++) {
                // remove the duplication
                if (makeListsResults.indexOf(tempResultsByClickedCategory[i].make) === -1) {
                    makeListsResults.push(tempResultsByClickedCategory[i].make);
                }
            }
            // get the array data from make lists was get from above.
            let finalTempResultsOfClickedCategory = [];
            for (let m = 0; m < Data.length; m++) {
                for (let n = 0; n < makeListsResults.length; n++) {
                    if (Data[m].make == makeListsResults[n]) {
                        finalTempResultsOfClickedCategory.push(Data[m]);
                    }
                }
            }
            // main search from final results array of clicked category.
            for (let i = 0; i < finalTempResultsOfClickedCategory.length; i++) {
                if (make_val == '') {
                    if (price_val) {
                        if (
                            finalTempResultsOfClickedCategory[i].price >= price_val[0] &&
                            finalTempResultsOfClickedCategory[i].price <= price_val[1] &&
                            finalTempResultsOfClickedCategory[i].year >= year_val[0] &&
                            finalTempResultsOfClickedCategory[i].year <= year_val[1] &&
                            finalTempResultsOfClickedCategory[i].kms >= odometer_val[0] &&
                            finalTempResultsOfClickedCategory[i].kms <= odometer_val[1]
                        ) {
                            results.push(finalTempResultsOfClickedCategory[i]);
                        }
                    }
                    else {
                        results.push(finalTempResultsOfClickedCategory[i]);
                    }
                }
                else if (finalTempResultsOfClickedCategory[i].make == make_val) {
                    if (model_val == '') {
                        if (price_val) {
                            if (
                                finalTempResultsOfClickedCategory[i].price >= price_val[0] &&
                                finalTempResultsOfClickedCategory[i].price <= price_val[1] &&
                                finalTempResultsOfClickedCategory[i].year >= year_val[0] &&
                                finalTempResultsOfClickedCategory[i].year <= year_val[1] &&
                                finalTempResultsOfClickedCategory[i].kms >= odometer_val[0] &&
                                finalTempResultsOfClickedCategory[i].kms <= odometer_val[1]
                            ) {
                                results.push(finalTempResultsOfClickedCategory[i]);
                            }
                        }
                        else {
                            results.push(finalTempResultsOfClickedCategory[i]);
                        }
                    }
                    else if (finalTempResultsOfClickedCategory[i].model == model_val) {
                        if (badge_val == '') {
                            if (price_val) {
                                if (
                                    finalTempResultsOfClickedCategory[i].price >= price_val[0] &&
                                    finalTempResultsOfClickedCategory[i].price <= price_val[1] &&
                                    finalTempResultsOfClickedCategory[i].year >= year_val[0] &&
                                    finalTempResultsOfClickedCategory[i].year <= year_val[1] &&
                                    finalTempResultsOfClickedCategory[i].kms >= odometer_val[0] &&
                                    finalTempResultsOfClickedCategory[i].kms <= odometer_val[1]
                                ) {
                                    results.push(finalTempResultsOfClickedCategory[i]);
                                }
                            }
                            else {
                                results.push(finalTempResultsOfClickedCategory[i]);
                            }
                        }
                        else if (((finalTempResultsOfClickedCategory[i].variant).split(' ').slice(0, 3).join(' ')) == badge_val) {
                            if (price_val) {
                                if (
                                    finalTempResultsOfClickedCategory[i].price >= price_val[0] &&
                                    finalTempResultsOfClickedCategory[i].price <= price_val[1] &&
                                    finalTempResultsOfClickedCategory[i].year >= year_val[0] &&
                                    finalTempResultsOfClickedCategory[i].year <= year_val[1] &&
                                    finalTempResultsOfClickedCategory[i].kms >= odometer_val[0] &&
                                    finalTempResultsOfClickedCategory[i].kms <= odometer_val[1]
                                ) {
                                    results.push(finalTempResultsOfClickedCategory[i]);
                                }
                            }
                            else {
                                results.push(finalTempResultsOfClickedCategory[i]);
                            }
                        }
                    }
                }
            }
            // removed the unmatched data array with advanced_val 
            if (advanced_val) {
                if (Object.keys(advanced_val).length !== 0 && advanced_val.constructor === Object) {
                    // check and remove the advanced value is ''
                    Object.keys(advanced_val).forEach(key => {
                        if (advanced_val[key] == '') {
                            delete advanced_val[key];
                        }
                    })
                    for (let j = results.length - 1; j >= 0; j--) {
                        if (advanced_val) {
                            let flag = true;
                            Object.keys(advanced_val).forEach(key1 => {
                                if (results[j][key1] != advanced_val[key1]) flag = false;
                            });
                            if (flag == false) {
                                results.splice(j, 1);
                            }
                        }
                    }
                }
            }
            // remove the unmatched data array with keywords_val
            if (keywords_val && keywords_val != '') {
                for (let k = results.length - 1; k >= 0; k--) {
                    if (
                        (results[k].make.toLowerCase()).indexOf(keywords_val.toLowerCase()) < 0 &&
                        (results[k].model.toLowerCase()).indexOf(keywords_val.toLowerCase()) < 0 &&
                        (results[k].variant.toLowerCase()).indexOf(keywords_val.toLowerCase()) < 0 &&
                        (results[k].transmission.toLowerCase()).indexOf(keywords_val.toLowerCase()) < 0 &&
                        (results[k].driveTrain.toLowerCase()).indexOf(keywords_val.toLowerCase()) < 0 &&
                        (results[k].engineSize.toLowerCase()).indexOf(keywords_val.toLowerCase()) < 0 &&
                        (results[k].fuelType.toLowerCase()).indexOf(keywords_val.toLowerCase()) < 0
                    ) {
                        results.splice(k, 1);
                    }
                }
            }
        }
        else {
            for (let i = 0; i < Data.length; i++) {
                if (make_val == '') {
                    if (price_val) {
                        if (
                            Data[i].price >= price_val[0] &&
                            Data[i].price <= price_val[1] &&
                            Data[i].year >= year_val[0] &&
                            Data[i].year <= year_val[1] &&
                            Data[i].kms >= odometer_val[0] &&
                            Data[i].kms <= odometer_val[1]
                        ) {
                            results.push(Data[i]);
                        }
                    }
                    else {
                        results.push(Data[i]);
                    }
                }
                else if (Data[i].make == make_val) {
                    if (model_val == '') {
                        if (price_val) {
                            if (
                                Data[i].price >= price_val[0] &&
                                Data[i].price <= price_val[1] &&
                                Data[i].year >= year_val[0] &&
                                Data[i].year <= year_val[1] &&
                                Data[i].kms >= odometer_val[0] &&
                                Data[i].kms <= odometer_val[1]
                            ) {
                                results.push(Data[i]);
                            }
                        }
                        else {
                            results.push(Data[i]);
                        }
                    }
                    else if (Data[i].model == model_val) {
                        if (badge_val == '') {
                            if (price_val) {
                                if (
                                    Data[i].price >= price_val[0] &&
                                    Data[i].price <= price_val[1] &&
                                    Data[i].year >= year_val[0] &&
                                    Data[i].year <= year_val[1] &&
                                    Data[i].kms >= odometer_val[0] &&
                                    Data[i].kms <= odometer_val[1]
                                ) {
                                    results.push(Data[i]);
                                }
                            }
                            else {
                                results.push(Data[i]);
                            }
                        }
                        else if (((Data[i].variant).split(' ').slice(0, 3).join(' ')) == badge_val) {
                            if (price_val) {
                                if (
                                    Data[i].price >= price_val[0] &&
                                    Data[i].price <= price_val[1] &&
                                    Data[i].year >= year_val[0] &&
                                    Data[i].year <= year_val[1] &&
                                    Data[i].kms >= odometer_val[0] &&
                                    Data[i].kms <= odometer_val[1]
                                ) {
                                    results.push(Data[i]);
                                }
                            }
                            else {
                                results.push(Data[i]);
                            }
                        }
                    }
                }
            }
            // removed the unmatched data array with advanced_val 
            if (advanced_val) {
                if (Object.keys(advanced_val).length !== 0 && advanced_val.constructor === Object) {
                    // check and remove the advanced value is ''
                    Object.keys(advanced_val).forEach(key => {
                        if (advanced_val[key] == '') {
                            delete advanced_val[key];
                        }
                    })
                    for (let j = results.length - 1; j >= 0; j--) {
                        if (advanced_val) {
                            let flag = true;
                            Object.keys(advanced_val).forEach(key1 => {
                                if (results[j][key1] != advanced_val[key1]) flag = false;
                            });
                            if (flag == false) {
                                results.splice(j, 1);
                            }
                        }
                    }
                }
            }
            // remove the unmatched data array with keywords_val
            if (keywords_val && keywords_val != '') {
                for (let k = results.length - 1; k >= 0; k--) {
                    if (
                        (results[k].make.toLowerCase()).indexOf(keywords_val.toLowerCase()) < 0 &&
                        (results[k].model.toLowerCase()).indexOf(keywords_val.toLowerCase()) < 0 &&
                        (results[k].variant.toLowerCase()).indexOf(keywords_val.toLowerCase()) < 0 &&
                        (results[k].transmission.toLowerCase()).indexOf(keywords_val.toLowerCase()) < 0 &&
                        (results[k].driveTrain.toLowerCase()).indexOf(keywords_val.toLowerCase()) < 0 &&
                        (results[k].engineSize.toLowerCase()).indexOf(keywords_val.toLowerCase()) < 0 &&
                        (results[k].fuelType.toLowerCase()).indexOf(keywords_val.toLowerCase()) < 0
                    ) {
                        results.splice(k, 1);
                    }
                }
            }
        }

        return results;
    }
    // classify according to category(body in Data.json)
    const classifyCategory = (data) => {
        const definedCategoryLists = {
            'Wagon': 0,
            'Seater': 0,
            'Fourwd': 0, //4wd
            'Awd': 0,
            'Sedan': 0,
            'Hatchback': 0,
            'Commercial': 0,
            'Utility': 0, // Utes(old)
            'Cab_Chassis': 0, // Dual Cab(old)
            'Hybrid': 0,
            'Coupe': 0,
            'Van': 0,
            'Mine_Spec': 0,
            'Motorcycle': 0,
            'Boat': 0,
            'Convertible': 0,
            'Electric': 0,
            'Bus': 0, // new one
            'Liftback': 0, // new one
        }

        for (let i = 0; i < data.length; i++) {
            // when search until Badge
            if (data[i][0]) {
                if (data[i][0].body == 'Wagon') {
                    definedCategoryLists.Wagon = definedCategoryLists.Wagon + 1;
                }
                else if (data[i][0].body == 'Seater') {
                    definedCategoryLists.Seater = definedCategoryLists.Seater + 1;
                }
                else if (data[i][0].body == '4wd') {
                    definedCategoryLists.Fourwd = definedCategoryLists.Fourwd + 1;
                }
                else if (data[i][0].body == 'Awd') {
                    definedCategoryLists.Awd = definedCategoryLists.Awd + 1;
                }
                else if (data[i][0].body == 'Sedan') {
                    definedCategoryLists.Sedan = definedCategoryLists.Sedan + 1;
                }
                else if (data[i][0].body == 'Hatchback') {
                    definedCategoryLists.Hatchback = definedCategoryLists.Hatchback + 1;
                }
                else if (data[i][0].body == 'Commercial') {
                    definedCategoryLists.Commercial = definedCategoryLists.Commercial + 1;
                }
                else if (data[i][0].body == 'Utility') {
                    definedCategoryLists.Utility = definedCategoryLists.Utility + 1;
                }
                else if (data[i][0].body == 'Cab Chassis') {
                    definedCategoryLists.Cab_Chassis = definedCategoryLists.Cab_Chassis + 1;
                }
                else if (data[i][0].body == 'Hybrid') {
                    definedCategoryLists.Hybrid = definedCategoryLists.Hybrid + 1;
                }
                else if (data[i][0].body == 'Coupe') {
                    definedCategoryLists.Coupe = definedCategoryLists.Coupe + 1;
                }
                else if (data[i][0].body == 'Van') {
                    definedCategoryLists.Van = definedCategoryLists.Van + 1;
                }
                else if (data[i][0].body == 'Mine Spec') {
                    definedCategoryLists.Mine_Spec = definedCategoryLists.Mine_Spec + 1;
                }
                else if (data[i][0].body == 'Motorcycle') {
                    definedCategoryLists.Motorcycle = definedCategoryLists.Motorcycle + 1;
                }
                else if (data[i][0].body == 'Convertible') {
                    definedCategoryLists.Convertible = definedCategoryLists.Convertible + 1;
                }
                else if (data[i][0].body == 'Electric') {
                    definedCategoryLists.Electric = definedCategoryLists.Electric + 1;
                }
                else if (data[i][0].body == 'Bus') {
                    definedCategoryLists.Bus = definedCategoryLists.Bus + 1;
                }
                else if (data[i][0].body == 'Liftback') {
                    definedCategoryLists.Liftback = definedCategoryLists.Liftback + 1;
                }

            }
            // when search until model
            else {
                if (data[i].body == 'Wagon') {
                    definedCategoryLists.Wagon = definedCategoryLists.Wagon + 1;
                }
                else if (data[i].body == 'Seater') {
                    definedCategoryLists.Seater = definedCategoryLists.Seater + 1;
                }
                else if (data[i].body == '4wd') {
                    definedCategoryLists.Fourwd = definedCategoryLists.Fourwd + 1;
                }
                else if (data[i].body == 'Awd') {
                    definedCategoryLists.Awd = definedCategoryLists.Awd + 1;
                }
                else if (data[i].body == 'Sedan') {
                    definedCategoryLists.Sedan = definedCategoryLists.Sedan + 1;
                }
                else if (data[i].body == 'Hatchback') {
                    definedCategoryLists.Hatchback = definedCategoryLists.Hatchback + 1;
                }
                else if (data[i].body == 'Commercial') {
                    definedCategoryLists.Commercial = definedCategoryLists.Commercial + 1;
                }
                else if (data[i].body == 'Utility') {
                    definedCategoryLists.Utility = definedCategoryLists.Utility + 1;
                }
                else if (data[i].body == 'Cab Chassis') {
                    definedCategoryLists.Cab_Chassis = definedCategoryLists.Cab_Chassis + 1;
                }
                else if (data[i].body == 'Hybrid') {
                    definedCategoryLists.Hybrid = definedCategoryLists.Hybrid + 1;
                }
                else if (data[i].body == 'Coupe') {
                    definedCategoryLists.Coupe = definedCategoryLists.Coupe + 1;
                }
                else if (data[i].body == 'Van') {
                    definedCategoryLists.Van = definedCategoryLists.Van + 1;
                }
                else if (data[i].body == 'Mine Spec') {
                    definedCategoryLists.Mine_Spec = definedCategoryLists.Mine_Spec + 1;
                }
                else if (data[i].body == 'Motorcycle') {
                    definedCategoryLists.Motorcycle = definedCategoryLists.Motorcycle + 1;
                }
                else if (data[i].body == 'Convertible') {
                    definedCategoryLists.Convertible = definedCategoryLists.Convertible + 1;
                }
                else if (data[i].body == 'Electric') {
                    definedCategoryLists.Electric = definedCategoryLists.Electric + 1;
                }
                else if (data[i].body == 'Bus') {
                    definedCategoryLists.Bus = definedCategoryLists.Bus + 1;
                }
                else if (data[i].body == 'Liftback') {
                    definedCategoryLists.Liftback = definedCategoryLists.Liftback + 1;
                }
            }

        }
        return definedCategoryLists;
    }
    // search by one value
    const oneValueSearch = (searchField, searchVal) => {
        let results = [];
        for (let i = 0; i < Data.length; i++) {
            if (Data[i][searchField] == searchVal) {
                results.push(Data[i]);
            }
        }
        return results;
    }
    // get the field list for make
    const getFieldLists = (fieldName) => {
        let results = [];

        if (checkClickedCategory.clicked == true || advancedValueInSelect && Object.keys(advancedValueInSelect).length !== 0 && advancedValueInSelect.constructor === Object) {
            // when advanced serach val is existed.
            for (let i = 0; i < searchResults.length; i++) {
                // remove the duplication
                if (results.indexOf(searchResults[i][fieldName]) === -1) {
                    results.push(searchResults[i][fieldName]);
                }
            }
        }
        else {
            // when advanecd search val is not existed.
            for (let i = 0; i < Data.length; i++) {
                // remove the duplication
                if (results.indexOf(Data[i][fieldName]) === -1) {
                    results.push(Data[i][fieldName]);
                }
            }
        }

        return results;
    }
    // get model list 
    const getModelLists = (makeName) => {
        let results = [];
        if (checkClickedCategory.clicked == true || advancedValueInSelect && Object.keys(advancedValueInSelect).length !== 0 && advancedValueInSelect.constructor === Object) {
            // when advanced search val is existed
            for (let i = 0; i < searchResults.length; i++) {
                if (searchResults[i].make == makeName) {
                    // remove the duplication
                    if (results.indexOf(searchResults[i].model) === -1) {
                        results.push(searchResults[i].model)
                    }
                }
            }
        }
        else {
            // when adavnced search val is not existed
            for (let i = 0; i < Data.length; i++) {

                if (Data[i].make == makeName) {
                    // remove the duplication
                    if (results.indexOf(Data[i].model) === -1) {
                        results.push(Data[i].model)
                    }
                }
            }
        }

        return results;
    }
    // get badge list
    const getBadgeLists = (modelName) => {
        let results = [];
        if (checkClickedCategory.clicked == true || advancedValueInSelect && Object.keys(advancedValueInSelect).length !== 0 && advancedValueInSelect.constructor === Object) {
            // when advaned value is existed
            for (let i = 0; i < searchResults.length; i++) {
                if (searchResults[i].model == modelName) {
                    // remove the duplication
                    if (results.indexOf(((searchResults[i].variant).split(' ').slice(0, 3).join(' '))) === -1) {
                        results.push((searchResults[i].variant).split(' ').slice(0, 3).join(' '));
                    }
                }
            }
        }
        else {
            // when advanced value is not existed
            for (let i = 0; i < Data.length; i++) {
                if (Data[i].model == modelName) {
                    // remove the duplication
                    if (results.indexOf(((Data[i].variant).split(' ').slice(0, 3).join(' '))) === -1) {
                        results.push((Data[i].variant).split(' ').slice(0, 3).join(' '));
                    }
                }
            }
        }
        return results;
    }

    // get advanced select tag dom lists
    const getAdvancedSelectDomLists = (selectTagName) => {
        let results = [];
        for (let i = 0; i < searchResults.length; i++) {
            // remove the duplication
            if (results.indexOf(searchResults[i][selectTagName]) === -1) {
                results.push(searchResults[i][selectTagName]);
            }
        }
        return results;
    }


    // this is for Price Sldier
    const handleChange = (newValue) => {
        setValue(newValue);
        
    };

    // this is for final change for PriceSlider.
    const FinalhandleChange = (newValue) => {
        setValue(newValue);
        let tempSearchResultsFromPrice = multipleValueSearch(makeValueInSelect, modelValueInSelect, badgeValueInSelect, newValue, yearValue, valueOdometer, advancedValueInSelect, keywords, checkClickedCategory);
        let classifiedTempResults = classifyCategory(tempSearchResultsFromPrice);
        setCategoryLists(classifiedTempResults);
        setSearchResults(tempSearchResultsFromPrice);
    }

    // this is for Year Slider
    const handleChangeYear = (newValue) => {
        setYearValue(newValue);
    };

    // final event for year slider
    const FinalhandleChangeYear = (newValue) => {
        setYearValue(newValue);
        let tempSearchResultsFromYear = multipleValueSearch(makeValueInSelect, modelValueInSelect, badgeValueInSelect, value, newValue, valueOdometer, advancedValueInSelect, keywords, checkClickedCategory);
        let classifiedTempResults = classifyCategory(tempSearchResultsFromYear);
        setCategoryLists(classifiedTempResults);
        setSearchResults(tempSearchResultsFromYear);
    }

    // this is for odometer slider 
    const handleChangeOdomter = (newValue) => {
        setValueOdometer(newValue);
    }

    // this is for final event of odometer slider
    const FinalhandleChangeOdometer = (newValue) => {
        setValueOdometer(newValue);
        let tempSearchResultsFromOdometer = multipleValueSearch(makeValueInSelect, modelValueInSelect, badgeValueInSelect, value, yearValue, newValue, advancedValueInSelect, keywords, checkClickedCategory);
        let classifiedTempResults = classifyCategory(tempSearchResultsFromOdometer);
        setCategoryLists(classifiedTempResults);
        setSearchResults(tempSearchResultsFromOdometer);
    }

    // this is for keyword change function 
    const handleKeywordsChange = (e) => {
        setKeywords(e.target.value);
    }
    // this is for switch of advanced search
    const handleAdvancedSearch = () => {
        advancedSearchCheck ? setAdvancedSearchCheck(false) : setAdvancedSearchCheck(true);
    }

    // this is for Select Elements Value
    const selectHandleChange = (e) => {
        let { name, value } = e.target;
        if (name == 'make') {
            // get model field
            if (value == 'Select Make') {
                setModel('');
                setMakeValueInSelect('');
                setModelValueInSelect('');
                setBadgeValueInSelect('');
            }
            else {
                setModel(getModelLists(value));
                setMakeValueInSelect(value);
                setModelValueInSelect('');
                setBadgeValueInSelect('');
            }
            // init badge field
            setBadge('');

        }
        if (name == 'model') {
            // get badge field
            if (value == 'Select Model') {
                setBadge('');
                setModelValueInSelect('');
                setBadgeValueInSelect('');
            }
            else {
                setBadge(getBadgeLists(value));
                setModelValueInSelect(value);
                setBadgeValueInSelect('');
            }

        }
        if (name == 'badge') {
            if (value == 'Select Badge') {
                setBadgeValueInSelect('');
            }
            else {
                setBadgeValueInSelect(value);
            }
        }

    }
    // this is for advanced elemetes handelchange
    const advancedHandleChange = (e) => {
        let { name, value } = e.target;
        if (name == 'transmission') {
            if (value == 'Select') {
                setAdvancedValueInSelect({
                    ...advancedValueInSelect,
                    transmission: ''
                });
            }
            else {
                setAdvancedValueInSelect({
                    ...advancedValueInSelect,
                    transmission: value
                });
            }
        }
        if (name == 'fuelType') {
            if (value == 'Select') {
                setAdvancedValueInSelect({
                    ...advancedValueInSelect,
                    fuelType: ''
                });
            }
            else {
                setAdvancedValueInSelect({
                    ...advancedValueInSelect,
                    fuelType: value
                });
            }
        }
        if (name == 'colour') {
            if (value == 'Select') {
                setAdvancedValueInSelect({
                    ...advancedValueInSelect,
                    colour: ''
                });
            }
            else {
                setAdvancedValueInSelect({
                    ...advancedValueInSelect,
                    colour: value
                })
            }
        }
        if (name == 'body') {
            if (value == 'Select') {
                setAdvancedValueInSelect({
                    ...advancedValueInSelect,
                    body: ''
                });
            }
            else {
                setAdvancedValueInSelect({
                    ...advancedValueInSelect,
                    body: value
                })
            }
        }
        if (name == 'engineSize') {
            if (value == 'Select') {
                setAdvancedValueInSelect({
                    ...advancedValueInSelect,
                    engineSize: ''
                });
            }
            else {
                setAdvancedValueInSelect({
                    ...advancedValueInSelect,
                    engineSize: value
                })
            }
        }
        if (name == 'stockNo') {
            setAdvancedValueInSelect({
                ...advancedValueInSelect,
                stockNo: value
            })
        }
    }
    // this is for category handle click
    const categoryHandleClick = (param) => {
        if (checkClickedCategory.clicked == false && checkClickedCategory.param != param) {
            setCheckClickedCategory({
                clicked: true,
                param: param
            });
        }
        else if (checkClickedCategory.clicked == true && checkClickedCategory.param != param) {
            setCheckClickedCategory({
                clicked: true,
                param: param
            });
        }
        else if (checkClickedCategory.clicked == false && checkClickedCategory.param == param) {
            setCheckClickedCategory({
                clicked: true,
                param: param
            });
        }
        else {
            setCheckClickedCategory({
                clicked: false,
                param: param
            });
        }
    }


    return (
        <div className="app">
            <div className="container">
                <div className="row topbar">
                    <div className="col-md-10 d-flex top-col">
                        <h3 className="title capital">Search our vehicle inventory</h3>
                        <p className="capital d-flex used">Used</p>
                    </div>
                    <div className="col-md-2 top-col right">
                        <p className="capital" onClick={handleReset} ><i className="fa fa-undo" aria-hidden="true"></i> reset</p>
                    </div>
                </div>
                <div className="row middle">

                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="make">Make</label>
                            <select
                                type="text"
                                className="form-control"
                                name="make"
                                onChange={selectHandleChange}
                                value={makeValueInSelect}
                            >
                                <option value='Select Make'>Select Make</option>
                                {make.map((item, index) => <option key={index}>{item}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="make">Model</label>
                            {
                                model
                                    ?
                                    <select
                                        type="text"
                                        className="form-control"
                                        name="model"
                                        onChange={selectHandleChange}
                                        value={modelValueInSelect}
                                    >
                                        <option value='Select Model'>Select Model</option>
                                        {model.map((item, index) => <option key={index}>{item}</option>)}
                                    </select>
                                    :
                                    <select type="text" className="form-control"
                                        name="model"
                                        onChange={selectHandleChange}
                                        value={modelValueInSelect}
                                        placeholder="Select Model"
                                        disabled
                                    >
                                        <option value='Select Model'>Select Model</option>
                                    </select>
                            }
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="make">Badge</label>
                            {
                                badge
                                    ?
                                    <select
                                        type="text"
                                        className="form-control"
                                        name="badge"
                                        onChange={selectHandleChange}
                                        value={badgeValueInSelect}
                                    >
                                        <option value='Select Badge'>Select Badge</option>
                                        {badge.map((item, index) => <option key={index}>{item}</option>)}
                                    </select>
                                    :
                                    <select type="text" className="form-control"
                                        name="badge"
                                        onChange={selectHandleChange}
                                        value={badgeValueInSelect}
                                        placeholder="Select Badge"
                                        disabled
                                    >
                                        <option value='Select Badge'>Select Badge</option>
                                    </select>
                            }
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="make" id="add_search">+ Add another search</label>
                    </div>

                </div>
                <div className="row main">
                    <div className="col-md-4">
                        <div className="form-group d-grid">
                            <label htmlFor="make">Price</label>
                            <div className={classes.margin}>
                                <Range
                                    allowOverlap
                                    ref={priceRangeRef}
                                    values={value}
                                    onChange={handleChange}
                                    onFinalChange={FinalhandleChange}
                                    renderThumb={PriceThumb}
                                    renderTrack={PriceTrack}
                                    min={min}
                                    max={max}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group d-grid">
                            <label htmlFor="make">Year</label>
                            <div className={classes.margin}>
                                <Range
                                    allowOverlap
                                    ref={rangeRef}
                                    values={yearValue}
                                    onChange={handleChangeYear}
                                    onFinalChange={FinalhandleChangeYear}
                                    renderThumb={Thumb}
                                    renderTrack={Track}
                                    min={minYear}
                                    max={maxYear}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="make">Keywords</label>
                            <input
                                type="text"
                                className="form-control"
                                name="keywords"
                                onChange={handleKeywordsChange}
                                value={keywords}
                            />
                        </div>
                    </div>
                    <div className="col-md-12" style={{ marginTop: '50px' }}>
                        <label htmlFor="category">Category</label>
                        <div className="search-content">
                            <div classNam="row d-flex" style={{ display: 'flex' }}>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-3">
                                            {
                                                categoryLists.Wagon == 0 ?
                                                    <div className="card text-center strong-disabled strikethrough">
                                                        <div className="card-body">
                                                            <img src={wagon} />
                                                            <p className="card-text">Wagon</p>
                                                            <span>(0)</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            checkClickedCategory.clicked == true && checkClickedCategory.param != 'Wagon' ?
                                                                <div
                                                                    className="card text-center disabled"
                                                                    onClick={() => categoryHandleClick('Wagon')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={wagon} />
                                                                        <p className="card-text">Wagon</p>
                                                                        <span>({categoryLists.Wagon})</span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div
                                                                    className="card text-center "
                                                                    onClick={() => categoryHandleClick('Wagon')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={wagon} />
                                                                        <p className="card-text">Wagon</p>
                                                                        <span>({categoryLists.Wagon})</span>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>


                                            }
                                        </div>
                                        <div className="col-md-3">
                                            {
                                                categoryLists.Seater == 0 ?
                                                    <div className="card text-center strong-disabled strikethrough">
                                                        <div className="card-body">
                                                            <img src={seaters} />
                                                            <p className="card-text">7 Seaters</p>
                                                            <span>(0)</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            checkClickedCategory.clicked == true && checkClickedCategory.param != 'Seater' ?
                                                                <div
                                                                    className="card text-center disabled"
                                                                    onClick={() => categoryHandleClick('Seater')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={seaters} />
                                                                        <p className="card-text">7 Seaters</p>
                                                                        <span>({categoryLists.Seater})</span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div
                                                                    className="card text-center"
                                                                    onClick={() => categoryHandleClick('Seater')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={seaters} />
                                                                        <p className="card-text">7 Seaters</p>
                                                                        <span>({categoryLists.Seater})</span>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>
                                            }
                                        </div>
                                        <div className="col-md-3">
                                            {
                                                categoryLists.Sedan == 0 ?
                                                    <div className="card text-center strong-disabled strikethrough">
                                                        <div className="card-body">
                                                            <img src={sedans} />
                                                            <p className="card-text">Sedans</p>
                                                            <span>(0)</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            checkClickedCategory.clicked == true && checkClickedCategory.param != 'Sedan' ?
                                                                <div
                                                                    className="card text-center disabled"
                                                                    onClick={() => categoryHandleClick('Sedan')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={sedans} />
                                                                        <p className="card-text">Sedans</p>
                                                                        <span>({categoryLists.Sedan})</span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div
                                                                    className="card text-center "
                                                                    onClick={() => categoryHandleClick('Sedan')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={sedans} />
                                                                        <p className="card-text">Sedans</p>
                                                                        <span>({categoryLists.Sedan})</span>
                                                                    </div>
                                                                </div>
                                                        }

                                                    </div>
                                            }
                                        </div>
                                        <div className="col-md-3">
                                            {
                                                categoryLists.Fourwd == 0 ?
                                                    <div className="card text-center strong-disabled strikethrough">
                                                        <div className="card-body">
                                                            <img src={wds} />
                                                            <p className="card-text">4WDs</p>
                                                            <span>(0)</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            checkClickedCategory.clicked == true && checkClickedCategory.param != '4wd' ?
                                                                <div
                                                                    className="card text-center disabled"
                                                                    onClick={() => categoryHandleClick('4wd')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={wds} />
                                                                        <p className="card-text">4WDs</p>
                                                                        <span>({categoryLists.Fourwd})</span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div
                                                                    className="card text-center"
                                                                    onClick={() => categoryHandleClick('4wd')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={wds} />
                                                                        <p className="card-text">4WDs</p>
                                                                        <span>({categoryLists.Fourwd})</span>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-3">
                                            {
                                                categoryLists.Awd == 0 ?
                                                    <div className="card text-center strong-disabled strikethrough">
                                                        <div className="card-body">
                                                            <img src={awds} />
                                                            <p className="card-text">AWDs</p>
                                                            <span>(0)</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            checkClickedCategory.clicked == true && checkClickedCategory.param != 'Awd' ?
                                                                <div
                                                                    className="card text-center disabled"
                                                                    onClick={() => categoryHandleClick('Awd')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={awds} />
                                                                        <p className="card-text">AWDs</p>
                                                                        <span>({categoryLists.Awd})</span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div
                                                                    className="card text-center"
                                                                    onClick={() => categoryHandleClick('Awd')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={awds} />
                                                                        <p className="card-text">AWDs</p>
                                                                        <span>({categoryLists.Awd})</span>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>
                                            }

                                        </div>
                                        <div className="col-md-3">
                                            {
                                                categoryLists.Hatchback == 0 ?
                                                    <div className="card text-center strong-disabled strikethrough">
                                                        <div className="card-body">
                                                            <img src={hatchbacks} />
                                                            <p className="card-text">Hatchbacks</p>
                                                            <span>(0)</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            checkClickedCategory.clicked == true && checkClickedCategory.param != 'Hatchback' ?
                                                                <div
                                                                    className="card text-center disabled"
                                                                    onClick={() => categoryHandleClick('Hatchback')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={hatchbacks} />
                                                                        <p className="card-text">Hatchbacks</p>
                                                                        <span>({categoryLists.Hatchback})</span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div
                                                                    className="card text-center"
                                                                    onClick={() => categoryHandleClick('Hatchback')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={hatchbacks} />
                                                                        <p className="card-text">Hatchbacks</p>
                                                                        <span>({categoryLists.Hatchback})</span>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>
                                            }
                                        </div>
                                        <div className="col-md-3">
                                            {
                                                categoryLists.Commercial == 0 ?
                                                    <div className="card text-center strong-disabled strikethrough">
                                                        <div className="card-body">
                                                            <img src={commercial} />
                                                            <p className="card-text">Commercial</p>
                                                            <span>(0)</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            checkClickedCategory.clicked == true && checkClickedCategory.param != 'Commercial' ?
                                                                <div
                                                                    className="card text-center disabled"
                                                                    onClick={() => categoryHandleClick('Commercial')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={commercial} />
                                                                        <p className="card-text">Commercial</p>
                                                                        <span>({categoryLists.Commercial})</span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div
                                                                    className="card text-center"
                                                                    onClick={() => categoryHandleClick('Commercial')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={commercial} />
                                                                        <p className="card-text">Commercial</p>
                                                                        <span>({categoryLists.Commercial})</span>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>

                                            }

                                        </div>
                                        <div className="col-md-3">
                                            {
                                                categoryLists.Utility == 0 ?
                                                    <div className="card text-center strong-disabled strikethrough">
                                                        <div className="card-body">
                                                            <img src={utes} />
                                                            <p className="card-text">Utes</p>
                                                            <span>(0)</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            checkClickedCategory.clicked == true && checkClickedCategory.param != 'Utility' ?
                                                                <div
                                                                    className="card text-center disabled"
                                                                    onClick={() => categoryHandleClick('Utility')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={utes} />
                                                                        <p className="card-text">Utes</p>
                                                                        <span>({categoryLists.Utility})</span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div
                                                                    className="card text-center"
                                                                    onClick={() => categoryHandleClick('Utility')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={utes} />
                                                                        <p className="card-text">Utes</p>
                                                                        <span>({categoryLists.Utility})</span>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>

                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div classNam="row d-flex" style={{ display: 'flex' }}>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-3">
                                            {
                                                categoryLists.Cab_Chassis == 0 ?
                                                    <div className="card text-center strong-disabled strikethrough">
                                                        <div className="card-body">
                                                            <img src={dual_cab} />
                                                            <p className="card-text">Dual Cab</p>
                                                            <span>(0)</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            checkClickedCategory.clicked == true && checkClickedCategory.param != 'Cab Chassis' ?
                                                                <div
                                                                    className="card text-center disabled"
                                                                    onClick={() => categoryHandleClick('Cab Chassis')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={dual_cab} />
                                                                        <p className="card-text">Dual Cab</p>
                                                                        <span>({categoryLists.Cab_Chassis})</span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div
                                                                    className="card text-center"
                                                                    onClick={() => categoryHandleClick('Cab Chassis')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={dual_cab} />
                                                                        <p className="card-text">Dual Cab</p>
                                                                        <span>({categoryLists.Cab_Chassis})</span>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>

                                            }
                                        </div>
                                        <div className="col-md-3">
                                            {
                                                categoryLists.Hybrid == 0 ?
                                                    <div className="card text-center strong-disabled strikethrough">
                                                        <div className="card-body">
                                                            <img src={hybrids} />
                                                            <p className="card-text">Hybrids</p>
                                                            <span>(0)</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            checkClickedCategory.clicked == true && checkClickedCategory.param != 'Hybrid' ?
                                                                <div
                                                                    className="card text-center disabled"
                                                                    onClick={() => categoryHandleClick('Hybrid')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={hybrids} />
                                                                        <p className="card-text">Hybrids</p>
                                                                        <span>({categoryLists.Hybrid})</span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div
                                                                    className="card text-center"
                                                                    onClick={() => categoryHandleClick('Hybrid')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={hybrids} />
                                                                        <p className="card-text">Hybrids</p>
                                                                        <span>({categoryLists.Hybrid})</span>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>

                                            }
                                        </div>
                                        <div className="col-md-3">
                                            {
                                                categoryLists.Coupe == 0 ?
                                                    <div className="card text-center strong-disabled strikethrough">
                                                        <div className="card-body">
                                                            <img src={coupes} />
                                                            <p className="card-text">Coupes</p>
                                                            <span>(0)</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            checkClickedCategory.clicked == true && checkClickedCategory.param != 'Coupe' ?
                                                                <div
                                                                    className="card text-center disabled"
                                                                    onClick={() => categoryHandleClick('Coupe')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={coupes} />
                                                                        <p className="card-text">Coupes</p>
                                                                        <span>({categoryLists.Coupe})</span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div
                                                                    className="card text-center"
                                                                    onClick={() => categoryHandleClick('Coupe')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={coupes} />
                                                                        <p className="card-text">Coupes</p>
                                                                        <span>({categoryLists.Coupe})</span>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>

                                            }

                                        </div>
                                        <div className="col-md-3">
                                            {
                                                categoryLists.Van == 0 ?
                                                    <div className="card text-center strong-disabled strikethrough">
                                                        <div className="card-body">
                                                            <img src={vans} />
                                                            <p className="card-text">Vans</p>
                                                            <span>(0)</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            checkClickedCategory.clicked == true && checkClickedCategory.param != 'Van' ?
                                                                <div
                                                                    className="card text-center disabled"
                                                                    onClick={() => categoryHandleClick('Van')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={vans} />
                                                                        <p className="card-text">Vans</p>
                                                                        <span>({categoryLists.Van})</span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div
                                                                    className="card text-center"
                                                                    onClick={() => categoryHandleClick('Van')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={vans} />
                                                                        <p className="card-text">Vans</p>
                                                                        <span>({categoryLists.Van})</span>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>

                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-3">
                                            {
                                                categoryLists.Mine_Spec == 0 ?
                                                    <div className="card text-center strong-disabled strikethrough">
                                                        <div className="card-body">
                                                            <img src={mine_spec} />
                                                            <p className="card-text">Mine Spec</p>
                                                            <span>(0)</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            checkClickedCategory.clicked == true && checkClickedCategory.param != 'Mine Spec' ?
                                                                <div
                                                                    className="card text-center disabled"
                                                                    onClick={() => categoryHandleClick('Mine Spec')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={mine_spec} />
                                                                        <p className="card-text">Mine Spec</p>
                                                                        <span>({categoryLists.Mine_Spec})</span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div
                                                                    className="card text-center"
                                                                    onClick={() => categoryHandleClick('Mine Spec')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={mine_spec} />
                                                                        <p className="card-text">Mine Spec</p>
                                                                        <span>({categoryLists.Mine_Spec})</span>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>

                                            }
                                        </div>
                                        <div className="col-md-3">
                                            {
                                                categoryLists.Motorcycle == 0 ?
                                                    <div className="card text-center strong-disabled strikethrough">
                                                        <div className="card-body">
                                                            <img src={motorcycles} />
                                                            <p className="card-text">Motorcycles</p>
                                                            <span>(0)</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            checkClickedCategory.clicked == true && checkClickedCategory.param != 'Motorcycle' ?
                                                                <div
                                                                    className="card text-center disabled"
                                                                    onClick={() => categoryHandleClick('Motorcycle')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={motorcycles} />
                                                                        <p className="card-text">Motorcycles</p>
                                                                        <span>({categoryLists.Motorcycle})</span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div
                                                                    className="card text-center"
                                                                    onClick={() => categoryHandleClick('Motorcycle')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={motorcycles} />
                                                                        <p className="card-text">Motorcycles</p>
                                                                        <span>({categoryLists.Motorcycle})</span>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>

                                            }
                                        </div>
                                        <div className="col-md-3">
                                            {
                                                categoryLists.Boat == 0 ?
                                                    <div className="card text-center strong-disabled strikethrough">
                                                        <div className="card-body">
                                                            <img src={boats} />
                                                            <p className="card-text">Boats</p>
                                                            <span>(0)</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            checkClickedCategory.clicked == true && checkClickedCategory.param != 'Boat' ?
                                                                <div
                                                                    className="card text-center disabled"
                                                                    onClick={() => categoryHandleClick('Boat')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={boats} />
                                                                        <p className="card-text">Boats</p>
                                                                        <span>({categoryLists.Boat})</span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div
                                                                    className="card text-center"
                                                                    onClick={() => categoryHandleClick('Boat')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={boats} />
                                                                        <p className="card-text">Boats</p>
                                                                        <span>({categoryLists.Boat})</span>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>

                                            }

                                        </div>
                                        <div className="col-md-3">
                                            {
                                                categoryLists.Convertible == 0 ?
                                                    <div className="card text-center strong-disabled strikethrough">
                                                        <div className="card-body">
                                                            <img src={convertibles} />
                                                            <p className="card-text">Convertibles</p>
                                                            <span>(0)</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            checkClickedCategory.clicked == true && checkClickedCategory.param != 'Convertible' ?
                                                                <div
                                                                    className="card text-center disabled"
                                                                    onClick={() => categoryHandleClick('Convertible')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={convertibles} />
                                                                        <p className="card-text">Convertibles</p>
                                                                        <span>({categoryLists.Convertible})</span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div
                                                                    className="card text-center"
                                                                    onClick={() => categoryHandleClick('Convertible')}
                                                                >
                                                                    <div className="card-body">
                                                                        <img src={convertibles} />
                                                                        <p className="card-text">Convertibles</p>
                                                                        <span>({categoryLists.Convertible})</span>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>

                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    advancedSearchCheck ?
                        <div className="row advanced">
                            <div className="col-md-4">
                                <div className="form-group d-grid">
                                    <label htmlFor="make">Odometer</label>
                                    <div className={classes.odometerMargin}>
                                        <Range
                                            allowOverlap
                                            ref={odometerRangeRef}
                                            values={valueOdometer}
                                            onChange={handleChangeOdomter}
                                            onFinalChange={FinalhandleChangeOdometer}
                                            renderThumb={OdometerThumb}
                                            renderTrack={OdometerTrack}
                                            min={minOdometer}
                                            max={maxOdometer}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="make">Transmission</label>
                                    {
                                        advancedSelectDomLists.transmission ?
                                            <select
                                                type="text"
                                                className="form-control"
                                                name="transmission"
                                                onChange={advancedHandleChange}
                                                value={advancedValueInSelect.transmission}
                                            >
                                                <option value="Select">Select Transmission</option>
                                                {advancedSelectDomLists.transmission.map((item, index) => {
                                                    if (item != '') {
                                                        return  <option key={index}>{item}</option>
                                                    }
                                                }
                                                   )}
                                            </select>
                                            :
                                            <select type="text" className="form-control disabled" placeholder="Select Make">
                                                <option value="">Select Transmission</option>
                                                <option value="BMW">BMW</option>
                                                <option value="Fiat">Fiat</option>
                                            </select>
                                    }
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="make">Fuel Type</label>
                                    {
                                        advancedSelectDomLists.fuelType ?
                                            <select
                                                type="text"
                                                className="form-control"
                                                name="fuelType"
                                                onChange={advancedHandleChange}
                                                value={advancedValueInSelect.fuelType}
                                            >
                                                <option value="Select">Select Fuel Type</option>
                                                {advancedSelectDomLists.fuelType.map((item, index) => {

                                                    if (item != '') {
                                                        return <option key={index}>{item}</option>;
                                                    }
                                                    
                                                }
                                                    )}
                                            </select>
                                            :
                                            <select type="text" className="form-control disabled" placeholder="Select Make">
                                                <option value="">Select Fuel Type</option>
                                                <option value="BMW">BMW</option>
                                                <option value="Fiat">Fiat</option>
                                            </select>
                                    }
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="make">Color</label>
                                    {
                                        advancedSelectDomLists.colour ?
                                            <select
                                                type="text"
                                                className="form-control"
                                                name="colour"
                                                onChange={advancedHandleChange}
                                                value={advancedValueInSelect.colour}
                                            >
                                                <option value="Select">Select Colour</option>
                                                {advancedSelectDomLists.colour.map((item, index) => {
                                                    if (item != '') {
                                                        return <option key={index}>{item}</option>
                                                    }
                                                }
                                                    )}
                                            </select>
                                            :
                                            <select type="text" className="form-control disabled" placeholder="Select Make">
                                                <option value="">Select Colour</option>
                                                <option value="BMW">BMW</option>
                                                <option value="Fiat">Fiat</option>
                                            </select>
                                    }
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="make">Doors</label>
                                    <select type="text" className="form-control" id="model" placeholder="Select Make">
                                        <option value="">Select Doors</option>
                                        <option value="BMW">BMW</option>
                                        <option value="Fiat">Fiat</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="make">Body</label>
                                    {
                                        advancedSelectDomLists.body ?
                                            <select
                                                type="text"
                                                className="form-control"
                                                name="body"
                                                onChange={advancedHandleChange}
                                                value={advancedValueInSelect.body}
                                            >
                                                <option value="Select">Select Body</option>
                                                {advancedSelectDomLists.body.map((item, index) => {
                                                    if (item != '') {
                                                        return <option key={index}>{item}</option>
                                                    }
                                                }
                                                    )}
                                            </select>
                                            :
                                            <select type="text" className="form-control disabled" placeholder="Select Make">
                                                <option value="">Select Body</option>
                                                <option value="BMW">BMW</option>
                                                <option value="Fiat">Fiat</option>
                                            </select>
                                    }
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="make">Cylinders</label>
                                    {
                                        advancedSelectDomLists.engineSize ?
                                            <select
                                                type="text"
                                                className="form-control"
                                                name="engineSize"
                                                onChange={advancedHandleChange}
                                                value={advancedValueInSelect.engineSize}
                                            >
                                                <option value="Select">Select Cylinders</option>
                                                {advancedSelectDomLists.engineSize.map((item, index) => {
                                                    if (item != '') {
                                                        return <option key={index}>{item}</option>
                                                    }
                                                }
                                                    )}
                                            </select>
                                            :
                                            <select type="text" className="form-control disabled" placeholder="Select Make">
                                                <option value="">Select Cylinders</option>
                                                <option value="BMW">BMW</option>
                                                <option value="Fiat">Fiat</option>
                                            </select>
                                    }
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="make">Stock No.</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="stockNo"
                                        onChange={advancedHandleChange}
                                        value={advancedValueInSelect.stockNo}
                                    />
                                </div>
                            </div>

                        </div>
                        :
                        ''
                }
                <div className="row actions">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <button className="btn capital">Show me 932 result</button>
                    </div>
                    <div className="col-md-4 d-flex advanced-search">
                        <a onClick={handleAdvancedSearch}>Advanced Search</a>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default App;