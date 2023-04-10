var wps_pdf_el = wp.element.createElement;
wp.blocks.registerBlockType('wps-pdf-snippet/post-block', {
   title       : wpg_custom_gutenberg_js_obj.title,
   icon        : 'welcome-widgets-menus',
   category    : 'common',
   description : wpg_custom_gutenberg_js_obj.description,
   keywords    : ['snippents', 'pdf', 'pdfsnippets'],
   attributes  : {
      type     : { type : 'string', default : 'default' },
      content  : { type : 'string', source  : 'text', selector : 'span' }
   },
   example : {},
   edit    : function(props) {
     function updateType( event ) {
        props.setAttributes( { type : event.target.value } );
      }
      return wps_pdf_el(
         'select',
         {
            onChange : updateType,
            class    : 'wpg-pdf-snippet-select'
         },
         wps_pdf_el("option", {value : "" }, wpg_custom_gutenberg_js_obj.please_choose),
         wps_pdf_el("option", {value : "{post-title}", selected : ( props.attributes.type == '{post-title}' ) ? true : false }, wpg_custom_gutenberg_js_obj.post_title),
         wps_pdf_el("option", {value : "{post-content}", selected : ( props.attributes.type == '{post-content}' ) ? true : false }, wpg_custom_gutenberg_js_obj.post_content),
         wps_pdf_el("option", {value : "{post-metafields}", selected : ( props.attributes.type == '{post-metafields}' ) ? true : false }, wpg_custom_gutenberg_js_obj.post_metafields),
         wps_pdf_el("option", {value : "{post-taxonomy}", selected : ( props.attributes.type == '{post-taxonomy}' ) ? true : false }, wpg_custom_gutenberg_js_obj.post_taxonomy),
         wps_pdf_el("option", {value : "{post-createddate}", selected : ( props.attributes.type == '{post-createddate}' ) ? true : false }, wpg_custom_gutenberg_js_obj.post_createddate),
         wps_pdf_el("option", {value : "{post-author}", selected : ( props.attributes.type == '{post-author}' ) ? true : false }, wpg_custom_gutenberg_js_obj.post_author),
         wps_pdf_el("option", {value : "{pageno}", selected : ( props.attributes.type == '{pageno}' ) ? true : false }, wpg_custom_gutenberg_js_obj.pageno),
      );
   },
   save: function(props) {
      return wps_pdf_el( wp.editor.RichText.Content, {
            tagName : 'span',
            value   : props.attributes.type
         }
      );
   }
});