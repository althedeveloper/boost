import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from 'next/image'
import moment from "moment";
interface MainCardProps {

    location: string;
    stats:{
      temp:number;
      humidity:number;
    };
    wind: number;
    currentWeather: {
      icon: string;
      description: string;
    };
    timezone: number;
    sunrise: number;
    sunset: number;
}

const MainCard = (props:MainCardProps) => {

  return (
        <div className={`flex flex-col items-center justify-center
                md:rounded-lg ease-in-out duration-500 transition-all transform 
                ${props.location ? `h-full opacity-100 p-4` :  'h-0 opacity-0'}   
            `}>
              <h2 className="text-2xl font-semibold text-white mb-6">
                  Current Weather
              </h2>
              <div className="w-full rounded-lg p-6 max-w-[350px] bg-fadedDarkBlue flex flex-col items-center justify-center">
                
                <div className="w-full font-semibold text-white flex items-center justify-center space-x-2">
                    <MapPinIcon className="w-1/12 text-sm text-yellow"/>
                    <span className="text-xl font-semibold" >{props.location}</span>
                </div>
                  
                <div className="w-full flex items-center justify-evenly space-x-4 mt-6">
                    <h2 className="text-4xl font-semibold text-white" >
                      {`${props.stats.temp}`}<span className="text-yellow font-normal">°C</span>
                    </h2>
                    <div className="flex max-w-[100px] items-center justify-center ">
                      <Image
                        src={ `https://openweathermap.org/img/wn/${props.currentWeather.icon}@2x.png`  }
                        width={70}
                        height={70}
                        className={''}
                        object-fit={'cover'}
                        alt={'next image'}
                      />
                      <span className="text-base font-semibold text-white" >{props.currentWeather.description}</span>
                  </div>
                </div>

                

                <div className="mt-4 w-full flex flex-col items-center justify-evenly">
                    <div className="text-white mt-2 flex flex-col text-left items-center justify-center space-2">
                      <p><b>Humidity: </b>
                        {props.stats.humidity}%
                      </p>
                    </div>
                    <div className="text-white mt-2 flex flex-col text-left items-center justify-center space-2">
                    <p><b>Wind: </b>
                      {props.wind} m/s
                      </p>
                    </div>
                  </div>

                <div className="mt-4 w-full flex items-center justify-between">
                    <div className="text-white mt-2 flex flex-col text-left items-start justify-center space-2">
                      <b>Sunrise</b>
                      <div>
                        {`${moment.utc(props.sunrise,'X').add(props.timezone,'seconds').format('HH:mm a')}`}
                      </div>
                    </div>
                    <div className="text-white mt-2 flex flex-col text-left items-start justify-center space-2">
                      <b>Sunset</b>
                      <div>
                        {`${moment.utc(props.sunset,'X').add(props.timezone,'seconds').format('HH:mm a')}`}
                        
                      </div>
                    </div>
                  </div>

              </div>
              
            </div>

  )

}

export default MainCard;