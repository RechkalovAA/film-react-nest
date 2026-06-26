import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Film } from './film.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column('integer')
  hall: number;

  @Column('integer', { name: 'rows' })
  rows: number;

  @Column('integer')
  seats: number;

  @Column({ type: 'double precision' })
  price: number;

  @Column('simple-array')
  taken: string[];

  @Column('uuid', { name: 'filmId' })
  filmId: string;

  @ManyToOne(() => Film, (film) => film.schedules)
  @JoinColumn({ name: 'filmId' })
  film: Film;
}
