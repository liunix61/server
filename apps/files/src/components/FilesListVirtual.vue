<!--
  - @copyright Copyright (c) 2019 Gary Kim <gary@garykim.dev>
  -
  - @author Gary Kim <gary@garykim.dev>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->
<template>
	<RecycleScroller ref="recycleScroller"
		class="files-list"
		key-field="source"
		:items="nodes"
		:item-size="55"
		:table-mode="true"
		item-class="files-list__row"
		item-tag="tr"
		list-class="files-list__body"
		list-tag="tbody"
		role="table">
		<template #default="{ item, active, index }">
			<!-- File row -->
			<FileEntry :active="active"
				:index="index"
				:is-size-available="isSizeAvailable"
				:source="item" />
		</template>

		<template #before>
			<!-- Accessibility description -->
			<caption class="hidden-visually">
				{{ currentView.caption || '' }}
				{{ t('files', 'This list is not fully rendered for performances reasons. The files will be rendered as you navigate through the list.') }}
			</caption>

			<!-- Thead-->
			<FilesListHeader :is-size-available="isSizeAvailable" :nodes="nodes" />
		</template>

		<template #after>
			<!-- Tfoot-->
			<FilesListFooter :is-size-available="isSizeAvailable" :nodes="nodes" :summary="summary" />
		</template>
	</RecycleScroller>
</template>

<script lang="ts">
import { RecycleScroller } from 'vue-virtual-scroller'
import { translate, translatePlural } from '@nextcloud/l10n'
import Vue from 'vue'

import FileEntry from './FileEntry.vue'
import FilesListFooter from './FilesListFooter.vue'
import FilesListHeader from './FilesListHeader.vue'

export default Vue.extend({
	name: 'FilesListVirtual',

	components: {
		RecycleScroller,
		FileEntry,
		FilesListHeader,
		FilesListFooter,
	},

	props: {
		currentView: {
			type: Object,
			required: true,
		},
		nodes: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			FileEntry,
		}
	},

	computed: {
		files() {
			return this.nodes.filter(node => node.type === 'file')
		},

		summaryFile() {
			const count = this.files.length
			return translatePlural('files', '{count} file', '{count} files', count, { count })
		},
		summaryFolder() {
			const count = this.nodes.length - this.files.length
			return translatePlural('files', '{count} folder', '{count} folders', count, { count })
		},
		summary() {
			return translate('files', '{summaryFile} and {summaryFolder}', this)
		},
		isSizeAvailable() {
			return this.nodes.some(node => node.attributes.size !== undefined)
		},
	},

	mounted() {
		// Make the root recycle scroller a table for proper semantics
		const slots = this.$el.querySelectorAll('.vue-recycle-scroller__slot')
		slots[0].setAttribute('role', 'thead')
		slots[1].setAttribute('role', 'tfoot')
	},

	methods: {
		getFileId(node) {
			return node.attributes.fileid
		},

		t: translate,
	},
})
</script>

<style scoped lang="scss">
.files-list {
	--row-height: 55px;
	--cell-margin: 14px;

	--checkbox-padding: calc((var(--row-height) - var(--checkbox-size)) / 2);
	--checkbox-size: 24px;
	--clickable-area: 44px;
	--icon-preview-size: 32px;

	display: block;
	overflow: auto;
	height: 100%;

	&::v-deep {
		// Table head, body and footer
		tbody, .vue-recycle-scroller__slot {
			display: flex;
			flex-direction: column;
			width: 100%;
			// Necessary for virtual scrolling absolute
			position: relative;
		}

		// Table header
		.vue-recycle-scroller__slot[role='thead'] {
			// Pinned on top when scrolling
			position: sticky;
			z-index: 10;
			top: 0;
			height: var(--row-height);
			background-color: var(--color-main-background);
		}

		/**
		 * Common row styling. tr are handled by
		 * vue-virtual-scroller, so we need to
		 * have those rules in here.
		 */
		tr {
			position: absolute;
			display: flex;
			align-items: center;
			width: 100%;
			border-bottom: 1px solid var(--color-border);
		}
	}
}

</style>
