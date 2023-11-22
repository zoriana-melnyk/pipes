import { ProductCard } from '../components';
import pipes_film from '../img/pipes_film.png';
import pipes_floor from '../img/pipes_floor.png';
import pipes_wal from '../img/pipes_wal.png';
import pipes_warm from '../img/pipes_warm.png';

function Products() {
  return (
    <div className="grid my-6 gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <ProductCard title="Плівка поліетиленова"
        text="Плівка поліетиленова: рукав, пів рукав, полотно.Первинна, вторинна, кольорова."
        image={pipes_film} />
      <ProductCard title="Труба для теплої підлоги"
        text="Труба для теплої підлоги SLQ Tece 16x2"
        image={pipes_floor} />
      <ProductCard
        title="Поліетиленова труба"
        text="Поліетиленова труба синя первинка ф32 х 2.5-3.0-3,4мм внутрішня стінка"
        image={pipes_wal} />
      <ProductCard
        title="Труба для утеплення"
        text="Труба 16X2 PEX-A для опалення.Для підігрівання підлоги.PEX."
        image={pipes_warm} />
    </div>
  );
}

export { Products };