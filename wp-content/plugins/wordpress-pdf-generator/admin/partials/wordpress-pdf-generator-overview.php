<?php
/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the html field for overview tab.
 *
 * @link       https://wpswings.com/
 * @since      1.0.0
 *
 * @package    Wordpress_Pdf_Generator
 * @subpackage Wordpress_Pdf_Generator/admin/partials
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div class="wps-overview__wrapper">
	<div class="wps-overview__banner">
		<img src="<?php echo esc_html( WORDPRESS_PDF_GENERATOR_DIR_URL ); ?>admin/src/images/banner-image.png" alt="Overview banner image">
	</div>
	<div class="wps-overview__content">
		<div class="wps-overview__content-description">
			<h2><?php echo esc_html_e( 'What is PDF Generator For WP Pro?', 'wordpress-pdf-generator' ); ?></h2>
			<p>
				<?php
				esc_html_e(
					'PDF Generator For WP Pro allows you to generate and share your website’s content PDF using different channels seamlessly.
					Using this plugin, you can easily convert your posts, product pages, and blogs into PDF format to make them available offline.
					There are various utilities allowing users and admins to generate PDF files of your WordPress content.
					It assists in dispersing your brand name through watermarks, customized headers and footers, and much more.
					PDF Generator For WP Pro is one such plugin that will let you or your users generate PDF with personalized settings.
					You can also fetch emails of your leads and potential customers for your marketing team.
					The premium PDF Generator plugin is now upgraded to equip you with better control of the feature on your WordPress site.',
					'wordpress-pdf-generator'
				);
				?>
			</p>
			<h3><?php esc_html_e( 'With our PDF Generator for WordPress plugin, you can:', 'wordpress-pdf-generator' ); ?></h3>
			<div class="wps-overview__features-wrapper">
				<ul class="wps-overview__features">
					<li><?php esc_html_e( 'Create PDF files to build your company portfolio as per your industry best practices.', 'wordpress-pdf-generator' ); ?></li>
					<li><?php esc_html_e( 'Allow users to download PDFs of products and post content from your website.', 'wordpress-pdf-generator' ); ?></li>
					<li><?php esc_html_e( 'Allow users to share the PDF files on different channels or access them offline.', 'wordpress-pdf-generator' ); ?></li>
					<li><?php esc_html_e( 'Upload PDF files in advance to let your customers download them.', 'wordpress-pdf-generator' ); ?></li>
					<li><?php esc_html_e( 'Request the users’ email id in exchange for information.', 'wordpress-pdf-generator' ); ?></li>
					<li><?php esc_html_e( 'Customize the PDF header, footer, and PDF body content.', 'wordpress-pdf-generator' ); ?></li>
					<li><?php esc_html_e( 'Customize the PDF watermark to add images and adjust the size and placement accordingly.', 'wordpress-pdf-generator' ); ?></li>
					<li><?php esc_html_e( 'Add your company name with all the other important details.', 'wordpress-pdf-generator' ); ?></li>
					<li><?php esc_html_e( 'Add the author’s name with other necessary details.', 'wordpress-pdf-generator' ); ?></li>
				</ul>
				<div class="wps-overview__video--url">
					<iframe width="560" height="315" src="https://www.youtube.com/embed/tmdht_8uLMI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				</div>
			</div>
		</div>
		<h2> <?php esc_html_e( 'The Pro Plugin Benefits', 'wordpress-pdf-generator' ); ?></h2>
		<div class="wps-overview__keywords">
			<div class="wps-overview__keywords-item">
				<div class="wps-overview__keywords-card">
					<div class="wps-overview__keywords-image">
						<img src="<?php echo esc_html( WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/Include-Details.png' ); ?>" alt="Advanced-report image">
					</div>
					<div class="wps-overview__keywords-text">
						<h3 class="wps-overview__keywords-heading"><?php echo esc_html_e( 'Include Details', 'wordpress-pdf-generator' ); ?></h3>
						<p class="wps-overview__keywords-description">
							<?php
							esc_html_e(
								'The PDF generator allows you to choose if you want to display the author’s name and details, date of publication, and different download options. The premium PDF generator also allows you to include company details in the generated files.',
								'wordpress-pdf-generator'
							);
							?>
						</p>
					</div>
				</div>
			</div>
			<div class="wps-overview__keywords-item">
				<div class="wps-overview__keywords-card">
					<div class="wps-overview__keywords-image">
						<img src="<?php echo esc_html( WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/Detailed-Log-And-Export-Bulk-PDF.png' ); ?>" alt="Workflow image">
					</div>
					<div class="wps-overview__keywords-text">
						<h3 class="wps-overview__keywords-heading"><?php esc_html_e( 'Detailed Log And Export Bulk PDF', 'wordpress-pdf-generator' ); ?></h3>
						<p class="wps-overview__keywords-description"><?php esc_html_e( 'Using the premium PDF generator plugin, you can export the generated PDF files of your product pages in bulk after predefining the settings. Besides exporting PDF, the plugin also maintains a comprehensive log of exported PDF files.', 'wordpress-pdf-generator' ); ?></p>
					</div>
				</div>
			</div>
			<div class="wps-overview__keywords-item">
				<div class="wps-overview__keywords-card">
					<div class="wps-overview__keywords-image">
						<img src="<?php echo esc_html( WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/On-Point-Templates.png' ); ?>" alt="Variable product image">
					</div>
					<div class="wps-overview__keywords-text">
						<h3 class="wps-overview__keywords-heading"><?php esc_html_e( 'On Point Templates', 'wordpress-pdf-generator' ); ?></h3>
						<p class="wps-overview__keywords-description">
							<?php
							esc_html_e(
								'You can also choose from the 4 cover page templates provided with the premium PDF Generator plugin to add the cover page. Add all your relevant company details in the backend for dispersing your brand information.',
								'wordpress-pdf-generator'
							);
							?>
						</p>
					</div>
				</div>
			</div>
			<div class="wps-overview__keywords-item">
				<div class="wps-overview__keywords-card">
					<div class="wps-overview__keywords-image">
						<img src="<?php echo esc_html( WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/Customize-Your-PDF.png' ); ?>" alt="List-of-abandoned-users image">
					</div>
					<div class="wps-overview__keywords-text">
						<h3 class="wps-overview__keywords-heading"><?php esc_html_e( 'Customize Your PDF', 'wordpress-pdf-generator' ); ?></h3>
						<p class="wps-overview__keywords-description">
							<?php
							esc_html_e(
								'The plugin allows you for the individual customization of the header, footer, and PDF body. You can set your desired margins, watermarks, custom logo, title, tagline, and much more. An exclusive feature in the PDF generator is compatibility with Arabic languages and RTL support.',
								'wordpress-pdf-generator'
							);
							?>
						</p>
					</div>
				</div>
			</div>
			<div class="wps-overview__keywords-item">
				<div class="wps-overview__keywords-card wps-card-support">
					<div class="wps-overview__keywords-image">
						<img src="<?php echo esc_html( WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/Create-Your-Own-Templates.png' ); ?>" alt="Support image">
					</div>
					<div class="wps-overview__keywords-text">
						<h3 class="wps-overview__keywords-heading"><?php esc_html_e( 'Create Your Own Templates', 'wordpress-pdf-generator' ); ?></h3>
						<p class="wps-overview__keywords-description">
							<?php
							esc_html_e(
								'The layout settings allow you to create your own templates for the generated files. Use the Gutenberg editor to create the same so you get a complete customization opportunity for positions and fields.',
								'wordpress-pdf-generator'
							);
							?>
						</p>
					</div>
				</div>
			</div>
			<div class="wps-overview__keywords-item">
				<div class="wps-overview__keywords-card wps-card-support">
					<div class="wps-overview__keywords-image">
						<img src="<?php echo esc_html( WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/Watermark.png' ); ?>" alt="Support image">
					</div>
					<div class="wps-overview__keywords-text">
						<h3 class="wps-overview__keywords-heading"><?php esc_html_e( 'Watermark', 'wordpress-pdf-generator' ); ?></h3>
						<p class="wps-overview__keywords-description">
							<?php
							esc_html_e(
								'The premium PDF generator allows you to add images. You can adjust the position, size, and opacity of the image for the watermark.',
								'wordpress-pdf-generator'
							);
							?>
						</p>
					</div>
				</div>
			</div>
			<div class="wps-overview__keywords-item">
				<div class="wps-overview__keywords-card wps-card-support">
					<div class="wps-overview__keywords-image">
						<img src="<?php echo esc_html( WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/Custom-CSS.png' ); ?>" alt="Support image">
					</div>
					<div class="wps-overview__keywords-text">
						<h3 class="wps-overview__keywords-heading"><?php esc_html_e( 'Custom CSS', 'wordpress-pdf-generator' ); ?></h3>
						<p class="wps-overview__keywords-description">
							<?php
							esc_html_e(
								'The premium PDF Generator plugin allows you to add your own CSS. You can edit the look and feel of the generated PDF files using this feature.',
								'wordpress-pdf-generator'
							);
							?>
						</p>
					</div>
				</div>
			</div>
			<div class="wps-overview__keywords-item">
				<div class="wps-overview__keywords-card wps-card-support">
					<div class="wps-overview__keywords-image">
						<img src="<?php echo esc_html( WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/Upload-Your-Own-PDF.png' ); ?>" alt="Support image">
					</div>
					<div class="wps-overview__keywords-text">
						<h3 class="wps-overview__keywords-heading"><?php esc_html_e( 'Upload Your Own PDF', 'wordpress-pdf-generator' ); ?></h3>
						<p class="wps-overview__keywords-description">
							<?php
							esc_html_e(
								'Another chic feature in the plugin to serve your purpose of generating PDF files is allowing you to upload your own PDF files. This lets you sell your product, services, or content in a manner you have planned in advance.',
								'wordpress-pdf-generator'
							);
							?>
						</p>
					</div>
				</div>
			</div>
			<div class="wps-overview__keywords-item">
				<div class="wps-overview__keywords-card wps-card-support">
					<div class="wps-overview__keywords-image">
						<img src="<?php echo esc_html( WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/Select-Appropriate-Metafields.png' ); ?>" alt="Support image">
					</div>
					<div class="wps-overview__keywords-text">
						<h3 class="wps-overview__keywords-heading"><?php esc_html_e( 'Select Appropriate Metafields', 'wordpress-pdf-generator' ); ?></h3>
						<p class="wps-overview__keywords-description">
							<?php
							esc_html_e(
								'Depending upon the purpose of your PDF file, you can select the appropriate meta fields. The plugin lets you select the meta fields specifically for products, pages, and posts respectively. So, you can edit the settings as per your target audience, be it a potential client or a new supplier.',
								'wordpress-pdf-generator'
							);
							?>
						</p>
					</div>
				</div>
			</div>
			<div class="wps-overview__keywords-item">
				<div class="wps-overview__keywords-card wps-card-support">
					<div class="wps-overview__keywords-image">
						<img src="<?php echo esc_html( WORDPRESS_PDF_GENERATOR_DIR_URL . 'admin/src/images/Select-Appropriate-Taxonomy.png' ); ?>" alt="Support image">
					</div>
					<div class="wps-overview__keywords-text">
						<h3 class="wps-overview__keywords-heading"><?php esc_html_e( 'Select Appropriate Taxonomy', 'wordpress-pdf-generator' ); ?></h3>
						<p class="wps-overview__keywords-description">
							<?php
							esc_html_e(
								'Depending upon the purpose of your PDF file, you can select the appropriate taxonomies to display. Select taxonomies specifically for products, pages, and posts respectively. So, you can edit the settings as per your target audience, be it a potential client or a new supplier.',
								'wordpress-pdf-generator'
							);
							?>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
