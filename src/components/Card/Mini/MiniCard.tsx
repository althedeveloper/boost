import Image from 'next/image'

interface MiniCardProps {
    key: number;
    date: number;
    weather: {
      icon: string;
    };
    temperature: {
      max: number;
      min: number;
    }
}

const MiniCard = (props:MiniCardProps) => {

  return (
    <div key={props.key} className="bg-fadedDarkBlue text-white md:w-fit flex-col items-center justify-center px-4 py-6 rounded shadow-lg">
    {`${new Date(props.date * 1000).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}`}
    <div className="flex items-center justify-center">
      <Image
        src={ `https://openweathermap.org/img/wn/${props.weather.icon}@2x.png`  }
        width={100}
        height={100}
        className={''}
        object-fit={'contain'}
        alt={'next image'}
      />
    </div>
    <div className="flex items-center justify-center space-x-2">
      <h2 className="text-base font-semibold text-white">{`${props.temperature.max}°`}</h2>
      <h2 className="text-sm text-white">{`${props.temperature.min}°`}</h2>
    </div>
  </div>

  )

}

export default MiniCard;