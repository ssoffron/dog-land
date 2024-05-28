import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AlertDialogDescription, AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { CircleAlert, MapIcon, SquareX } from 'lucide-react';

export default function Map() {
  const [suddenEvent, setSuddenEvent] = useState('');

  return (
    <>
      <h1 className='my-4 text-2xl text-center font-bold'>지도</h1>
      <AlertDialog>
        <AlertDialogTrigger
          className='fixed top-4 right-4'
          onClick={() => setSuddenEvent(getSuddenEvent().label)}
        >
          <Button className='px-2' size='sm'>
            <CircleAlert />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center text-xl font-bold'>
              특수 이벤트
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center'>{suddenEvent}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='border-0'>
              <SquareX />
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <main className='grid grid-cols-10 place-items-center w-[90vw] h-[90vh] m-auto'>
        {map.map(({ id, attributes }) => (
          <AlertDialog key={id}>
            <AlertDialogTrigger className='w-full h-full'>
              <Button className='w-full h-full p-0 rounded-none' variant='outline'>
                <MapIcon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-center text-xl font-bold'>
                  땅의 특성
                </AlertDialogTitle>
                {attributes.map((attr) =>
                  attr ? (
                    <AlertDialogDescription key='attr' className='text-center'>
                      {attr.label}
                    </AlertDialogDescription>
                  ) : null,
                )}
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className='border-0'>
                  <SquareX />
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </main>
    </>
  );
}

const LAND_ATTRIBUTES: Record<string, Attribute[]> = {
  CLEANNESS: [
    { key: 'dirty', label: '더러운 동네', probability: 0.3 },
    { key: 'clean', label: '깨끗한 동네', probability: 0.2 },
  ],
  TEMPERATURE: [
    { key: 'hot', label: '더움', probability: 0.1 },
    { key: 'warm', label: '따뜻함', probability: 0.2 },
    { key: 'cool', label: '선선함', probability: 0.2 },
    { key: 'cold', label: '추움', probability: 0.1 },
  ],
  LANDSCAPE: [
    { key: 'mountain', label: '산', probability: 0.2 },
    { key: 'river', label: '강', probability: 0.1 },
    { key: 'forest', label: '숲', probability: 0.1 },
    { key: 'field', label: '초원', probability: 0.1 },
    { key: 'desert', label: '사막', probability: 0.1 },
    { key: 'beach', label: '해안', probability: 0.1 },
    { key: 'city', label: '도시', probability: 0.3 },
  ],
};

const map = new Array(10 ** 2).fill(0).map((_, idx) => ({
  id: idx,
  attributes: selectLandAttributes([
    LAND_ATTRIBUTES.CLEANNESS,
    LAND_ATTRIBUTES.TEMPERATURE,
    LAND_ATTRIBUTES.LANDSCAPE,
  ]),
}));

type Attribute = { key: string; label: string; probability: number };

function selectAttribute(attributes: Attribute[]): Attribute | null {
  const totalProbability = 1;
  let random = Math.random() * totalProbability;

  for (const attr of attributes) {
    if (random < attr.probability) {
      return attr;
    }
    random -= attr.probability;
  }

  return null; // None selected
}

function selectLandAttributes(attributesByTypes: Attribute[][]) {
  return attributesByTypes.map(selectAttribute);
}

function getSuddenEvent() {
  return SUDDEN_EVENTS[Math.floor(Math.random() * SUDDEN_EVENTS.length)];
}

const SUDDEN_EVENTS = [
  { key: 'SNAKE', label: '뱀이 기어온다!' },
  { key: 'CAT', label: '길고양이를 마주쳤습니다' },
  { key: 'RAIN', label: '갑자기 소나기가 쏟아져요' },
  { key: 'SUNNY', label: '날씨가 아주 맑네요' },
  { key: 'CLOUDY', label: '구름이 많이 끼었어요' },
  { key: 'SNOW', label: '함박눈이 내려요' },
];
