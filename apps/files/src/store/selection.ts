/**
 * @copyright Copyright (c) 2023 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
/* eslint-disable */
import { defineStore } from 'pinia'
import Vue from 'vue'

export const useSelectionStore = defineStore('selection', {
	state: () => ({
		selected: [] as number[]
	}),

	actions: {
		/**
		 * Set the selection of fileIds
		 */
		set(selection = [] as number[]) {
			Vue.set(this, 'selected', selection)
		},

		/**
		 * Reset the selection
		 */
		reset() {
			Vue.set(this, 'selected', [])
		}
	}
})
