using OnlineShop.Entities.CommonEntitites;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using static OnlineShop.Common.OnlineShopConstants;

namespace OnlineShop.Data.Repositories
{
    public class ProductRepository : CommonRepository<ProductViewModel>
    {
        public List<ProductViewModel> GetAllProducts()
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.GetAllProducts);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllProducts Failed: {e.Message}\n {e.StackTrace}");
                return new List<ProductViewModel>();
            }
        }

        public List<Categories> GetAllCategoryForProduct()
        {
            try
            {
                var result = ListByStoredProcedure<Categories>(StoredProc.GetAllCategoryForProduct);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategoryForProduct Failed: {e.Message}\n {e.StackTrace}");
                return new List<Categories>();
            }
        }

        public List<Producers> GetAllProducerForProduct()
        {
            try
            {
                var result = ListByStoredProcedure<Producers>(StoredProc.GetAllProducerForProduct);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllProducerForProduct Failed: {e.Message}\n {e.StackTrace}");
                return new List<Producers>();
            }
        }

        public List<Products> InsertProducts(Products product)
        {
            try
            {
                var result = ListByStoredProcedure<Products>(StoredProc.InsertProducts,
                                      new StoredProcedureParameter("Name", product.Name, DbType.String)
                                    , new StoredProcedureParameter("Code", product.Code, DbType.String)
                                    , new StoredProcedureParameter("Price", product.Price, DbType.Double)
                                    , new StoredProcedureParameter("Discount", product.Discount, DbType.Double)
                                    , new StoredProcedureParameter("Image", product.Image, DbType.String)
                                    , new StoredProcedureParameter("Available", product.Available, DbType.Boolean)
                                    , new StoredProcedureParameter("Description", product.Description, DbType.String)
                                    , new StoredProcedureParameter("Detail", product.Detail, DbType.String)
                                    , new StoredProcedureParameter("Warranty", product.Warranty, DbType.String)
                                    , new StoredProcedureParameter("Quantity", product.Quantity, DbType.Int32)
                                    , new StoredProcedureParameter("Special", product.Special, DbType.DateTime)
                                    , new StoredProcedureParameter("Views", product.Views, DbType.Int32)
                                    , new StoredProcedureParameter("CategoryID", product.CategoryID, DbType.Int32)
                                    , new StoredProcedureParameter("ProducerID", product.ProducerID, DbType.Int32)
                                    , new StoredProcedureParameter("Status", product.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("CreatedBy", product.CreatedBy, DbType.String)
                                    , new StoredProcedureParameter("CreatedDate", product.CreatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("LastUpdatedBy", product.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", product.LastUpdatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("IsDelete", product.IsDelete, DbType.Boolean));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"InsertProducts Failed: {e.Message}\n {e.StackTrace}");
                return new List<Products>();
            }
        }

        public List<Products> UpdateProducts(Products product)
        {
            try
            {
                var result = ListByStoredProcedure<Products>(StoredProc.UpdateProducts,
                                      new StoredProcedureParameter("ProductID", product.ProductID, DbType.Int32)
                                    , new StoredProcedureParameter("Name", product.Name, DbType.String)
                                    , new StoredProcedureParameter("Code", product.Code, DbType.String)
                                    , new StoredProcedureParameter("Price", product.Price, DbType.Double)
                                    , new StoredProcedureParameter("Discount", product.Discount, DbType.Double)
                                    , new StoredProcedureParameter("Image", product.Image, DbType.String)
                                    , new StoredProcedureParameter("Available", product.Available, DbType.Boolean)
                                    , new StoredProcedureParameter("Description", product.Description, DbType.String)
                                    , new StoredProcedureParameter("Detail", product.Detail, DbType.String)
                                    , new StoredProcedureParameter("Warranty", product.Warranty, DbType.String)
                                    , new StoredProcedureParameter("Quantity", product.Quantity, DbType.Int32)
                                    , new StoredProcedureParameter("Special", product.Special, DbType.DateTime)
                                    , new StoredProcedureParameter("CategoryID", product.CategoryID, DbType.Int32)
                                    , new StoredProcedureParameter("ProducerID", product.ProducerID, DbType.Int32)
                                    , new StoredProcedureParameter("Status", product.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("LastUpdatedBy", product.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", product.LastUpdatedDate, DbType.DateTime));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateProducts Failed: {e.Message}\n {e.StackTrace}");
                return new List<Products>();
            }
        }

        public List<Products> DeleteProducts(Products product)
        {
            try
            {
                var result = ListByStoredProcedure<Products>(StoredProc.DeleteProducts,
                                      new StoredProcedureParameter("ProductID", product.ProductID, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteProducts Failed: {e.Message}\n {e.StackTrace}");
                return new List<Products>();
            }
        }
    }
}
