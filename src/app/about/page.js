'use client';

import { Button, Timeline } from 'flowbite-react';
import { HiArrowNarrowRight, HiCalendar } from 'react-icons/hi';

export default function AboutUs() {
  return (
    <div className="w-1/2 self-center my-10">
      <Timeline>
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Time>2016-до теперішнього часу</Timeline.Time>
            <Timeline.Title>Інновації та Співпраця</Timeline.Title>
            <Timeline.Body>
              Сучасна історія "Поліпресмаш" відзначена неперервними інноваціями
              та співпрацею з ключовими партнерами. Компанія продовжує
              вдосконалювати свою продукцію, враховуючи найсучасніші технології
              та стандарти якості.
            </Timeline.Body>
            <Button
              color="gray"
              onClick={() => {
                window.open('https://polypresmash.prom.ua/ua/', '_blank');
              }}
            >
              Learn More
              <HiArrowNarrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Time>2011-2015</Timeline.Time>
            <Timeline.Title>Міжнародний розгін</Timeline.Title>
            <Timeline.Body>
              Визнання високої якості продукції "Поліпресмаш" призвело до
              розширення міжнародного присутності компанії. Завдяки успішним
              експортним угодам та партнерствам, продукція "Поліпресмаш" стала
              доступною для клієнтів у багатьох країнах світу, сприяючи
              впровадженню передових технологій у галузі пластмасового
              виробництва.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Time>2006-2010</Timeline.Time>
            <Timeline.Title>Розширення асортименту</Timeline.Title>
            <Timeline.Body>
              У другому десятиріччі свого існування компанія розширила свій
              асортимент продукції, додавши до своєї лінійки нові технологічно
              вдосконалені труби. Інженери "Поліпресмаш" працювали над розробкою
              інноваційних матеріалів та дизайнів, що дозволило компанії вийти
              за межі звичайних стандартів у виробництві труб і пластмасових
              виробів.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Time>2000-2005:</Timeline.Time>
            <Timeline.Title>Початки</Timeline.Title>
            <Timeline.Body>
              Компанія "Поліпресмаш" була заснована в 2000 році відданою групою
              фахівців з пластмасового виробництва. З початковим фокусом на
              інновації та якість, компанія швидко здобула популярність серед
              клієнтів. Протягом перших п'яти років свого існування
              "Поліпресмаш" став визнаним лідером у виробництві високоякісних
              пластмасових виробів.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
