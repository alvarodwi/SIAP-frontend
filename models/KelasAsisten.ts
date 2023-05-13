import { AsistenPraktikum } from './AsistenPraktikum'
import { Kelas } from './Kelas'

// mapping many-to-many kelas dan asisten
export interface KelasAsisten {
	id: string
	kelas?: Kelas
	asisten?: AsistenPraktikum
}
